export interface CarouselButtonProps {
  direction: "left" | "right";
  onClick: () => void;
  disabled: boolean;
  icon?: React.ReactNode;
}
