import { ANIMATION_EASING, TRANSITION_DURATION } from "../../../constants";
import { Container, Content } from "./styles";
import { CarouselContainerProps } from "./types";

export const CarouselContainer = ({
  width,
  dislocate,
  dragOffset,
  isDragging,
  children,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: CarouselContainerProps) => {
  const itemWidth = typeof width === "number" ? width : parseInt(width);

  return (
    <Container width={width} isDragging={isDragging}>
      <Content
        dislocate={dislocate}
        dragOffset={dragOffset}
        isDragging={isDragging}
        transitionDuration={TRANSITION_DURATION}
        transitionEasing={ANIMATION_EASING}
        itemWidth={itemWidth}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </Content>
    </Container>
  );
};
