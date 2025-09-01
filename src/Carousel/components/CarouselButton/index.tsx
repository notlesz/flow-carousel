import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from "./CarouselButton.module.scss";
import { CarouselButtonProps } from "./types";

export const CarouselButton = ({
  direction,
  onClick,
  disabled = false,
  icon,
  size = 40,
  ariaLabel,
}: CarouselButtonProps) => {
  const defaultIcon =
    direction === "left" ? <FaChevronLeft /> : <FaChevronRight />;

  const defaultAriaLabel = `${
    direction === "left" ? "Previous" : "Next"
  } slide`;

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      data-size={size}
      aria-label={ariaLabel || defaultAriaLabel}
      tabIndex={0}
    >
      <span className={styles.icon}>{icon || defaultIcon}</span>
    </button>
  );
};
