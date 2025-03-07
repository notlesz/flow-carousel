import { useEffect, useRef } from "react";

export const useCarouselAutoplay = (
  autoplay: boolean,
  autoplayInterval: number,
  handleNext: () => void,
  infinite: boolean,
  isLastSlide: boolean
) => {
  const intervalRef = useRef<NodeJS.Timeout>();
  const lastAutoplayTime = useRef(Date.now());

  useEffect(() => {
    const startAutoplay = () => {
      if (!autoplay || (!infinite && isLastSlide)) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        return;
      }

      const now = Date.now();
      const timeSinceLastAutoplay = now - lastAutoplayTime.current;

      if (timeSinceLastAutoplay < autoplayInterval) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setTimeout(
          startAutoplay,
          autoplayInterval - timeSinceLastAutoplay
        );
        return;
      }

      handleNext();
      lastAutoplayTime.current = now;
      intervalRef.current = setTimeout(startAutoplay, autoplayInterval);
    };

    startAutoplay();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoplay, autoplayInterval, handleNext, infinite, isLastSlide]);
};
