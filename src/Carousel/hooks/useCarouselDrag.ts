import { useCallback, useEffect, useRef, useState } from "react";

export const useCarouselDrag = (
  setDislocate: (value: number) => void,
  itemWidth: number,
  totalItems: number,
  showItems: number,
  gap: number
) => {
  const dragStartRef = useRef<number | null>(null);
  const startDislocateRef = useRef(0);
  const lastDragPosition = useRef<number | null>(null);
  const dragVelocity = useRef(0);
  const lastDragTime = useRef(0);
  const animationFrameRef = useRef<number>();
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, currentDislocate: number) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      const position = "touches" in e ? e.touches[0].clientX : e.clientX;
      dragStartRef.current = position;
      lastDragPosition.current = position;
      lastDragTime.current = Date.now();
      startDislocateRef.current = currentDislocate;
      dragVelocity.current = 0;
      setIsDragging(true);
      setDragOffset(0);
    },
    []
  );

  const handleDragMove = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging || dragStartRef.current === null) return;

      const position = "touches" in e ? e.touches[0].clientX : e.clientX;
      const currentTime = Date.now();

      if (lastDragPosition.current !== null) {
        const timeDiff = currentTime - lastDragTime.current;
        const posDiff = position - lastDragPosition.current;
        dragVelocity.current = posDiff / timeDiff;
      }

      lastDragPosition.current = position;
      lastDragTime.current = currentTime;

      const difference = dragStartRef.current - position;
      const totalWidth = itemWidth + gap;
      const maxDislocate = Math.max(0, totalItems - showItems) * totalWidth;

      let finalDragOffset = difference;
      const projectedPosition = startDislocateRef.current + difference;

      if (projectedPosition < 0) {
        finalDragOffset =
          difference * Math.exp(projectedPosition / totalWidth / 2);
      } else if (projectedPosition > maxDislocate) {
        const overscroll = projectedPosition - maxDislocate;
        finalDragOffset = difference * Math.exp(-overscroll / totalWidth / 2);
      }

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        setDragOffset(finalDragOffset);
      });
    },
    [isDragging, itemWidth, gap, totalItems, showItems]
  );

  const handleDragEnd = useCallback(() => {
    if (dragStartRef.current === null) return;

    const totalWidth = itemWidth + gap;
    const currentPosition = startDislocateRef.current + dragOffset;

    const nearestItem = Math.round(currentPosition / totalWidth) * totalWidth;

    const maxDislocate = Math.max(0, totalItems - showItems) * totalWidth;
    const finalPosition = Math.max(0, Math.min(maxDislocate, nearestItem));

    dragStartRef.current = null;
    lastDragPosition.current = null;
    dragVelocity.current = 0;

    requestAnimationFrame(() => {
      setDislocate(finalPosition);
      setIsDragging(false);
      setDragOffset(0);
    });
  }, [dragOffset, itemWidth, gap, totalItems, showItems, setDislocate]);

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    isDragging,
    dragOffset,
  };
};
