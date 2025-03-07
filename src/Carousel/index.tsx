import React, { useEffect } from "react";
import { CAROUSEL_GAP, DEFAULT_AUTOPLAY_INTERVAL } from "../constants";
import { calculateItemWidth } from "../utils/calculations";
import { CarouselButton } from "./components/CarouselButton";
import { CarouselContainer } from "./components/CarouselContainer";
import { CarouselIndicators } from "./components/CarouselIndicators";
import { CarouselItemWrapper } from "./components/CarouselItemWrapper";
import { useCarouselAutoplay } from "./hooks/useCarouselAutoplay";
import { useCarouselControls } from "./hooks/useCarouselControls";
import { useCarouselDrag } from "./hooks/useCarouselDrag";
import { useCarouselKeyboard } from "./hooks/useCarouselKeyboard";
import { CarouselWrapper } from "./styles";
import { CarouselProps } from "./types";

export const Carousel = ({
  carouselWidth,
  showItems,
  totalItems,
  name,
  infinite = false,
  autoplay = false,
  autoplayInterval = DEFAULT_AUTOPLAY_INTERVAL,
  showIndicators = true,
  children,
}: CarouselProps) => {
  const itemWidth = calculateItemWidth(
    typeof carouselWidth === "number" ? carouselWidth : parseInt(carouselWidth),
    showItems
  );

  const { dislocate, setDislocate, handleNext, handleBack, forceReset } =
    useCarouselControls(totalItems, showItems, itemWidth);

  useEffect(() => {
    forceReset();
  }, [totalItems, showItems, itemWidth, carouselWidth, forceReset]);

  const calculateMaxDislocate = () => {
    return Math.max(0, (totalItems - showItems) * (itemWidth + CAROUSEL_GAP));
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
    itemWidth,
    totalItems,
    showItems,
    CAROUSEL_GAP
  );

  useCarouselKeyboard(handleNext, handleBack);

  const currentIndex = Math.round(
    dislocate / ((itemWidth + CAROUSEL_GAP) * showItems)
  );

  const totalPages = Math.ceil((totalItems - showItems + 1) / showItems);

  const wrappedChildren = React.Children.map(children, (child) => (
    <CarouselItemWrapper width={itemWidth}>{child}</CarouselItemWrapper>
  ));

  return (
    <div>
      <CarouselWrapper
        role="region"
        aria-label={`Carousel ${name || ""}`}
        onMouseLeave={handleDragEnd}
      >
        <CarouselButton
          direction="left"
          onClick={handleBack}
          disabled={!infinite && isFirstSlide}
        />
        <CarouselContainer
          width={carouselWidth}
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
          onTouchStart={(e) => handleDragStart(e, dislocate)}
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
        />
      </CarouselWrapper>
      {showIndicators && totalPages > 1 && (
        <CarouselIndicators
          totalItems={totalPages}
          showItems={1}
          currentIndex={currentIndex}
          onSelect={(index) =>
            setDislocate(index * (itemWidth + CAROUSEL_GAP) * showItems)
          }
        />
      )}
    </div>
  );
};
