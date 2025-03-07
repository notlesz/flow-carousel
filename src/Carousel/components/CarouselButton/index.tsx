import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ButtonWrapper } from "./styles";
import { CarouselButtonProps } from "./types";

export const CarouselButton = ({
  direction,
  onClick,
  disabled = false,
  icon,
}: CarouselButtonProps) => {
  const defaultIcon =
    direction === "left" ? <FaChevronLeft /> : <FaChevronRight />;

  return (
    <ButtonWrapper
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction === "left" ? "Previous" : "Next"} slide`}
    >
      {icon || defaultIcon}
    </ButtonWrapper>
  );
};
