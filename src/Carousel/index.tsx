import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { CarouselBody, CarouselContainer, CarouselWrapper } from "./styles";

interface CarouselProps {
  name?: string;
  carouselWidth: number;
  showItems: number;
  totalItems: number;
  children: ReactNode;
  components?: {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };
  dragSensitivity?: number;
  snapToItem?: boolean;
}

function Carousel(props: CarouselProps) {
  const {
    carouselWidth,
    showItems,
    totalItems,
    children,
    name,
    components,
    dragSensitivity = 1.5,
    snapToItem = true,
  } = props;

  const [dislocate, setDislocate] = useState(0);
  const [typeChildren, setTypeChildren] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const innerCarouselRef = useRef<HTMLDivElement>(null);
  const carouselContainerRef = useRef<HTMLDivElement>(null);

  const dragInfo = useRef({
    startX: 0,
    startScrollLeft: 0,
    timeStamp: 0,
    lastX: 0,
    velocity: 0,
  });

  const maxWidthCarousel = (totalItems * carouselWidth) / showItems;
  const itemWidth = Number((carouselWidth / showItems).toFixed(1));

  const maxDislocate = maxWidthCarousel - showItems * itemWidth;
  const disableNext = dislocate >= maxDislocate;
  const disabledBack = dislocate <= 0;

  const snapToNearestItem = useCallback(
    (dislocateValue: number) => {
      if (!snapToItem) return dislocateValue;

      const itemIndex = Math.round(dislocateValue / itemWidth);
      return itemIndex * itemWidth;
    },
    [itemWidth, snapToItem]
  );

  const handleNext = () => {
    if (disableNext) return;

    const nextItem = Math.ceil(dislocate / itemWidth) * itemWidth + itemWidth;
    setDislocate(Math.min(nextItem, maxDislocate));
  };

  const handleBack = () => {
    if (disabledBack) return;

    const prevItem = Math.floor(dislocate / itemWidth) * itemWidth - itemWidth;
    setDislocate(Math.max(prevItem, 0));
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;

    dragInfo.current = {
      startX: clientX,
      startScrollLeft: dislocate,
      timeStamp: Date.now(),
      lastX: clientX,
      velocity: 0,
    };

    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.cursor = "grabbing";
      carouselContainerRef.current.style.userSelect = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const moveX = (dragInfo.current.startX - clientX) * dragSensitivity;

    const now = Date.now();
    const dt = now - dragInfo.current.timeStamp;
    if (dt > 0) {
      dragInfo.current.velocity =
        ((dragInfo.current.lastX - clientX) / dt) * 15;
      dragInfo.current.timeStamp = now;
      dragInfo.current.lastX = clientX;
    }

    let newDislocate = dragInfo.current.startScrollLeft + moveX;

    if (newDislocate < 0) {
      newDislocate = newDislocate / 3;
    } else if (newDislocate > maxDislocate) {
      const overscroll = newDislocate - maxDislocate;
      newDislocate = maxDislocate + overscroll / 3;
    }

    setDislocate(newDislocate);
  };

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    if (carouselContainerRef.current) {
      carouselContainerRef.current.style.cursor = "grab";
      carouselContainerRef.current.style.userSelect = "auto";
    }

    if (Math.abs(dragInfo.current.velocity) > 0.5) {
      const momentumDislocate = dislocate + dragInfo.current.velocity * 20;
      const boundedDislocate = Math.max(
        0,
        Math.min(momentumDislocate, maxDislocate)
      );

      const finalPosition = snapToNearestItem(boundedDislocate);
      setDislocate(finalPosition);
    } else {
      setDislocate(snapToNearestItem(dislocate));
    }
  }, [dislocate, isDragging, maxDislocate, snapToNearestItem]);

  useEffect(() => {
    if (innerCarouselRef.current) {
      const transitionDuration = isDragging ? "0ms" : "350ms";
      innerCarouselRef.current.style.transform = `translateX(-${dislocate}px)`;
      innerCarouselRef.current.style.transition = `transform ${transitionDuration}`;
    }
  }, [dislocate, innerCarouselRef, isDragging]);

  useEffect(() => {
    if (innerCarouselRef.current) {
      setTypeChildren(innerCarouselRef.current?.children[0].localName);
    }
  }, [innerCarouselRef]);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [handleMouseUp, isDragging]);

  if (!innerCarouselRef) return <></>;

  return (
    <CarouselWrapper>
      <button onClick={handleBack} disabled={disabledBack}>
        {components?.leftIcon || <FaChevronLeft />}
      </button>
      <CarouselContainer
        ref={carouselContainerRef}
        width={carouselWidth}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <CarouselBody
          ref={innerCarouselRef}
          id={`carousel-${name}`}
          width={maxWidthCarousel}
          itemWidth={itemWidth}
          typeChildren={typeChildren}
        >
          {children}
        </CarouselBody>
      </CarouselContainer>
      <button onClick={handleNext}>
        {components?.rightIcon || <FaChevronRight />}{" "}
      </button>
    </CarouselWrapper>
  );
}

export default Carousel;
