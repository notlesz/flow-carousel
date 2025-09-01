import styles from "./CarouselIndicators.module.scss";
import { CarouselIndicatorsProps } from "./types";

export const CarouselIndicators = ({
  totalItems,
  showItems,
  currentIndex,
  onSelect,
}: CarouselIndicatorsProps) => {
  const totalPages = Math.ceil(totalItems / showItems);

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={styles.dot}
          data-active={index === currentIndex}
          onClick={() => onSelect(index)}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};
