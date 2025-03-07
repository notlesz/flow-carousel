import { IndicatorDot, IndicatorsWrapper } from "./styles";
import { CarouselIndicatorsProps } from "./types";

export const CarouselIndicators = ({
  totalItems,
  showItems,
  currentIndex,
  onSelect,
}: CarouselIndicatorsProps) => {
  const totalPages = Math.ceil(totalItems / showItems);

  return (
    <IndicatorsWrapper>
      {Array.from({ length: totalPages }).map((_, index) => (
        <IndicatorDot
          key={index}
          active={index === currentIndex}
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </IndicatorsWrapper>
  );
};
