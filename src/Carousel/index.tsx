import React from "react";
import styled from "styled-components";

interface CarouselProps {
  name?: string;
  carouselWidth: number;
  showItems: number;
  totalItems: number;
  children: React.ReactNode;
}

const CarouselWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
const CarouselContainer = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  overflow: hidden;
`;
const CarouselBody = styled.div<{
  width: number;
  itemWidth: number;
  typeChildren?: string;
}>`
  display: flex;
  align-items: center;
  list-style: none;
  width: ${({ width }) => width}px;

  & > ${({ typeChildren }) => typeChildren} {
    width: ${({ itemWidth }) => itemWidth}px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

function Carousel({
  carouselWidth,
  showItems,
  totalItems,
  children,
  name,
}: CarouselProps) {
  const [dislocate, setDislocate] = React.useState(0);
  const [typeChildren, setTypeChildren] = React.useState("");

  const innerCarouselRef = React.useRef<HTMLDivElement>(null);

  const maxWidthCarousel = (totalItems * carouselWidth) / showItems;

  const itemWidth = Number((carouselWidth / showItems).toFixed(1));

  const maxDislocate = maxWidthCarousel - showItems * itemWidth;
  const disableNext = dislocate >= maxDislocate;
  const disabledBack = dislocate <= 0;

  const handleNext = () => {
    if (disableNext) return;
    setDislocate((state) => Number((state + itemWidth).toFixed(1)));
  };
  const handleBack = () => {
    if (disabledBack) return;
    setDislocate((state) => Number((state - itemWidth).toFixed(1)));
  };

  React.useEffect(() => {
    if (innerCarouselRef.current) {
      innerCarouselRef.current.style.transform = `translateX(-${dislocate}px)`;
      innerCarouselRef.current.style.transition = `350ms, 350ms`;
    }
  }, [dislocate, innerCarouselRef]);

  React.useEffect(() => {
    if (innerCarouselRef.current) {
      setTypeChildren(innerCarouselRef.current?.children[0].localName);
    }
  }, [innerCarouselRef]);

  if (!innerCarouselRef) return <></>;

  return (
    <CarouselWrapper>
      <button onClick={handleBack}> - </button>
      <CarouselContainer width={carouselWidth}>
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
      <button onClick={handleNext}> + </button>
    </CarouselWrapper>
  );
}

export default Carousel;
