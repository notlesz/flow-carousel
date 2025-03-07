export interface CarouselIndicatorsProps {
  totalItems: number;
  showItems: number;
  currentIndex: number;
  onSelect: (index: number) => void;
}
