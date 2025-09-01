import React, { useEffect, useRef } from "react";
import { DEFAULT_AUTOPLAY_INTERVAL } from "../constants";
import { CarouselButton } from "./components/CarouselButton";
import { CarouselContainer } from "./components/CarouselContainer";
import { CarouselIndicators } from "./components/CarouselIndicators";
import { CarouselItemWrapper } from "./components/CarouselItemWrapper";
import { useCarouselAutoplay } from "./hooks/useCarouselAutoplay";
import { useCarouselControls } from "./hooks/useCarouselControls";
import { useCarouselDrag } from "./hooks/useCarouselDrag";
import { useCarouselKeyboard } from "./hooks/useCarouselKeyboard";
import { useResponsiveCarousel } from "./hooks/useResponsiveCarousel";
import styles from "./Carousel.module.scss";
import { CarouselProps } from "./types";

export const Carousel = ({
  // New responsive API
  responsive,

  // Legacy props (backward compatibility)
  carouselWidth,
  showItems: legacyShowItems,

  // Core props
  totalItems,
  name,
  infinite = false,
  autoplay = false,
  autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL,
  showIndicators = true,
  children,

  // Enhanced props
  ariaLabel,
  ariaDescribedBy,
  enableMomentum = true,
  swipeThreshold = 50,
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Use responsive hook for modern responsive behavior
  const {
    containerWidth,
    showItems: responsiveShowItems,
    gap,
    buttonSize,
    itemWidth,
    calculateItemWidth,
    isReady,
  } = useResponsiveCarousel(containerRef, responsive);

  // Fallback to legacy props if no responsive config
  const finalShowItems = responsive
    ? responsiveShowItems
    : legacyShowItems || 4;

  // Calculate item width considering infinite mode for preview
  const finalItemWidth = responsive
    ? calculateItemWidth(infinite)
    : carouselWidth
    ? ((typeof carouselWidth === "number"
        ? carouselWidth
        : parseInt(carouselWidth)) -
        gap * (finalShowItems - 1)) /
      finalShowItems
    : itemWidth;

  const {
    dislocate,
    setDislocate,
    handleNext,
    handleBack,
    goToFirst,
    goToLast,
    forceReset,
  } = useCarouselControls(totalItems, finalShowItems, finalItemWidth, infinite);

  useEffect(() => {
    if (isReady) {
      forceReset();
    }
  }, [
    totalItems,
    finalShowItems,
    finalItemWidth,
    containerWidth,
    forceReset,
    isReady,
  ]);

  const calculateMaxDislocate = () => {
    return Math.max(0, (totalItems - finalShowItems) * (finalItemWidth + gap));
  };

  const isFirstSlide = dislocate === 0;
  const isLastSlide = dislocate >= calculateMaxDislocate();

  useCarouselAutoplay(
    autoplay,
    autoplayInterval,
    handleNext,
    infinite,
    isLastSlide
  );

  const {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isDragging,
    dragOffset,
  } = useCarouselDrag(
    setDislocate,
    finalItemWidth,
    totalItems,
    finalShowItems,
    gap,
    enableMomentum,
    swipeThreshold
  );

  useCarouselKeyboard(
    handleNext,
    handleBack,
    containerRef,
    goToFirst,
    goToLast
  );

  // Input validation (after all hooks to follow rules of hooks)
  if (totalItems <= 0) {
    console.warn("Carousel: totalItems must be greater than 0");
    return null;
  }

  if (!children) {
    console.warn("Carousel: children is required");
    return null;
  }

  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length !== totalItems) {
    console.warn(
      `Carousel: Expected ${totalItems} children but received ${childrenArray.length}`
    );
  }

  // Validate autoplay interval
  if (autoplayInterval < 100) {
    console.warn("Carousel: autoplayInterval should be at least 100ms");
  }

  // Validate swipe threshold
  if (swipeThreshold < 0) {
    console.warn("Carousel: swipeThreshold cannot be negative");
  }

  // Calcula o índice atual baseado em quantos itens movemos
  const currentIndex = Math.round(dislocate / (finalItemWidth + gap));

  // Número total de posições possíveis no carousel
  const totalPages = Math.max(1, totalItems - finalShowItems + 1);

  const wrappedChildren = React.Children.map(children, (child, index) => (
    <CarouselItemWrapper width={finalItemWidth} key={index}>
      {child}
    </CarouselItemWrapper>
  ));

  // Don't render if not ready (prevents layout shift)
  if (!isReady && responsive) {
    return (
      <div
        ref={containerRef}
        className={styles.wrapper}
        data-loading="true"
        aria-label="Carousel loading..."
      />
    );
  }

  return (
    <div ref={containerRef}>
      <div
        className={styles.wrapper}
        role="region"
        aria-label={ariaLabel || `Carousel ${name || ""}`}
        aria-describedby={ariaDescribedBy}
        aria-live="polite"
        aria-atomic="false"
        onMouseLeave={handleDragEnd}
      >
        <CarouselButton
          direction="left"
          onClick={handleBack}
          disabled={!infinite && isFirstSlide}
          size={buttonSize}
          ariaLabel={`Go to previous ${
            finalShowItems > 1 ? "group of items" : "item"
          }`}
        />
        <CarouselContainer
          width={responsive ? containerWidth : carouselWidth}
          dislocate={dislocate}
          dragOffset={dragOffset}
          isDragging={isDragging}
          onMouseDown={(e) => {
            e.preventDefault();
            handleDragStart(e, dislocate);
          }}
          onMouseMove={(e) => {
            e.preventDefault();
            handleDragMove(e);
          }}
          onMouseUp={handleDragEnd}
          onTouchStart={(e) => {
            e.preventDefault();
            handleDragStart(e, dislocate);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
            handleDragMove(e);
          }}
          onTouchEnd={handleDragEnd}
        >
          {wrappedChildren}
        </CarouselContainer>
        <CarouselButton
          direction="right"
          onClick={handleNext}
          disabled={!infinite && isLastSlide}
          size={buttonSize}
          ariaLabel={`Go to next ${
            finalShowItems > 1 ? "group of items" : "item"
          }`}
        />
      </div>
      {showIndicators && !infinite && totalPages > 1 && (
        <CarouselIndicators
          totalItems={totalPages}
          showItems={1}
          currentIndex={currentIndex}
          onSelect={(index) => setDislocate(index * (finalItemWidth + gap))}
        />
      )}

      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        style={{
          position: "absolute",
          left: "-10000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        {`Showing items ${currentIndex + 1} to ${Math.min(
          currentIndex + finalShowItems,
          totalItems
        )} of ${totalItems}. Page ${currentIndex + 1} of ${totalPages}.`}
      </div>
    </div>
  );
};
