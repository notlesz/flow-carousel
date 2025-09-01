import { useEffect } from "react";

export const useCarouselKeyboard = (
  handleNext: () => void,
  handleBack: () => void,
  containerRef?: React.RefObject<HTMLDivElement>,
  onGoToFirst?: () => void,
  onGoToLast?: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard events if carousel is focused or contains focus
      const isCarouselFocused =
        containerRef?.current?.contains(document.activeElement) ||
        document.activeElement === containerRef?.current;

      if (!isCarouselFocused) return;

      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          handleBack();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          handleNext();
          break;
        case "Home":
          e.preventDefault();
          if (onGoToFirst) {
            onGoToFirst();
          }
          break;
        case "End":
          e.preventDefault();
          if (onGoToLast) {
            onGoToLast();
          }
          break;
        case "PageUp":
          e.preventDefault();
          handleBack();
          break;
        case "PageDown":
          e.preventDefault();
          handleNext();
          break;
      }
    };

    // Use keydown for better UX (keyup can feel laggy)
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNext, handleBack, containerRef, onGoToFirst, onGoToLast]);
};
