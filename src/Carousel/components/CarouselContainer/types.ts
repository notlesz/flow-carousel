export interface CarouselContainerProps {
  width: number | string;
  dislocate: number;
  dragOffset: number;
  isDragging: boolean;
  children: React.ReactNode;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
}

export interface ContentProps {
  dislocate: number;
  dragOffset: number;
  isDragging: boolean;
  transitionDuration: number;
  transitionEasing: string;
  itemWidth: number;
}
