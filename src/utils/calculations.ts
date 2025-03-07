import { CAROUSEL_GAP } from "../constants";

export const calculateNextPosition = (
  currentPosition: number,
  itemWidth: number,
  totalItems: number,
  showItems: number
) => {
  const maxPosition = (totalItems - showItems) * itemWidth;
  const nextPosition = currentPosition + itemWidth;
  return Math.min(maxPosition, nextPosition);
};

export const calculateItemWidth = (
  containerWidth: number,
  showItems: number
) => {
  const totalGapSpace = CAROUSEL_GAP * (showItems - 1);
  const availableWidth = containerWidth - totalGapSpace;
  return availableWidth / showItems;
};
