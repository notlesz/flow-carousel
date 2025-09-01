import styles from "./CarouselContainer.module.scss";
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
  return (
    <div
      className={styles.container}
      data-width={width}
      data-dragging={isDragging}
    >
      <div
        className={styles.content}
        data-dragging={isDragging}
        style={{
          transform: `translateX(${-(dislocate + dragOffset)}px)`,
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};
