import { useCallback, useEffect, useRef, useState } from "react";
import { CAROUSEL_GAP, TRANSITION_DURATION } from "../../constants";

export const useCarouselControls = (
  totalItems: number,
  showItems: number,
  itemWidth: number,
  infinite = false
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
        if (nextPosition > maxDislocate) {
          // Se infinite, volta ao início. Se não, para no máximo
          const newPosition = infinite ? 0 : maxDislocate;
          resetAnimation();
          return newPosition;
        } else {
          resetAnimation();
          return nextPosition;
        }
      });
    });
  }, [itemWidth, calculateMaxDislocate, resetAnimation, infinite]);

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
        if (nextPosition < 0) {
          // Se infinite, vai para o final. Se não, para no início
          const newPosition = infinite ? maxDislocate : 0;
          resetAnimation();
          return newPosition;
        } else {
          resetAnimation();
          return nextPosition;
        }
      });
    });
  }, [itemWidth, calculateMaxDislocate, resetAnimation, infinite]);

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

  const goToFirst = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    lastInteractionTime.current = Date.now();

    requestAnimationFrame(() => {
      setDislocate(0);
      resetAnimation();
    });
  }, [resetAnimation]);

  const goToLast = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    lastInteractionTime.current = Date.now();

    const maxDislocate = calculateMaxDislocate();

    requestAnimationFrame(() => {
      setDislocate(maxDislocate);
      resetAnimation();
    });
  }, [calculateMaxDislocate, resetAnimation]);

  return {
    dislocate,
    setDislocate: safeSetDislocate,
    handleNext,
    handleBack,
    goToFirst,
    goToLast,
    forceReset,
  };
};
