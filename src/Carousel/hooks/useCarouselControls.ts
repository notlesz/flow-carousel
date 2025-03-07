import { useCallback, useEffect, useRef, useState } from "react";
import { CAROUSEL_GAP, TRANSITION_DURATION } from "../../constants";

export const useCarouselControls = (
  totalItems: number,
  showItems: number,
  itemWidth: number
) => {
  const [dislocate, setDislocate] = useState(0);
  const isAnimatingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const lastInteractionTime = useRef(Date.now());

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const calculateMaxDislocate = useCallback(() => {
    return Math.max(0, (totalItems - showItems) * (itemWidth + CAROUSEL_GAP));
  }, [totalItems, showItems, itemWidth]);

  const resetAnimation = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
    }, TRANSITION_DURATION + 50);
  }, []);

  const safeSetDislocate = useCallback(
    (newPosition: number) => {
      const now = Date.now();
      if (now - lastInteractionTime.current < TRANSITION_DURATION) {
        return;
      }

      lastInteractionTime.current = now;
      const maxDislocate = calculateMaxDislocate();
      const safePosition = Math.max(0, Math.min(newPosition, maxDislocate));

      requestAnimationFrame(() => {
        setDislocate(safePosition);
      });
    },
    [calculateMaxDislocate]
  );

  const handleNext = useCallback(() => {
    if (isAnimatingRef.current) return;

    const now = Date.now();
    if (now - lastInteractionTime.current < TRANSITION_DURATION) {
      return;
    }

    isAnimatingRef.current = true;
    lastInteractionTime.current = now;

    const maxDislocate = calculateMaxDislocate();
    const moveAmount = itemWidth + CAROUSEL_GAP;

    requestAnimationFrame(() => {
      setDislocate((prev) => {
        const nextPosition = prev + moveAmount;
        const newPosition = nextPosition > maxDislocate ? 0 : nextPosition;
        resetAnimation();
        return newPosition;
      });
    });
  }, [itemWidth, calculateMaxDislocate, resetAnimation]);

  const handleBack = useCallback(() => {
    if (isAnimatingRef.current) return;

    const now = Date.now();
    if (now - lastInteractionTime.current < TRANSITION_DURATION) {
      return;
    }

    isAnimatingRef.current = true;
    lastInteractionTime.current = now;

    const maxDislocate = calculateMaxDislocate();
    const moveAmount = itemWidth + CAROUSEL_GAP;

    requestAnimationFrame(() => {
      setDislocate((prev) => {
        const nextPosition = prev - moveAmount;
        const newPosition = nextPosition < 0 ? maxDislocate : nextPosition;
        resetAnimation();
        return newPosition;
      });
    });
  }, [itemWidth, calculateMaxDislocate, resetAnimation]);

  const forceReset = useCallback(() => {
    isAnimatingRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    lastInteractionTime.current = 0;
    requestAnimationFrame(() => {
      setDislocate(0);
    });
  }, []);

  return {
    dislocate,
    setDislocate: safeSetDislocate,
    handleNext,
    handleBack,
    forceReset,
  };
};
