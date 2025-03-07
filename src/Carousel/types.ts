export interface CarouselProps {
  carouselWidth: number;
  showItems: number;
  totalItems: number;
  name?: string;
  infinite?: boolean;
  autoplay?: boolean;
  autoplayInterval?: number;
  showIndicators?: boolean;
  children: React.ReactNode;
  components?: {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };
  dragSensitivity?: number;
  snapToItem?: boolean;
}
