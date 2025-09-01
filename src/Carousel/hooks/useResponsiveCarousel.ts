import { useCallback, useEffect, useMemo, useRef, useState } from "react";

/** Configuration for a single responsive breakpoint */
export interface ResponsiveBreakpoint {
  /** Maximum screen width for this breakpoint */
  maxWidth: number;
  /** Number of items to show at this breakpoint */
  showItems: number;
  /** Gap between items in pixels */
  gap: number;
  /** Size of navigation buttons in pixels */
  buttonSize: number;
}

/** Responsive configuration object with breakpoint definitions */
export interface ResponsiveConfig {
  /** Extra small screens (up to 480px) */
  xs?: Partial<ResponsiveBreakpoint>;
  /** Small screens (up to 768px) */
  sm?: Partial<ResponsiveBreakpoint>;
  /** Medium screens (up to 1024px) */
  md?: Partial<ResponsiveBreakpoint>;
  /** Large screens (up to 1440px) */
  lg?: Partial<ResponsiveBreakpoint>;
  /** Extra large screens (1440px+) */
  xl?: Partial<ResponsiveBreakpoint>;
}

const DEFAULT_BREAKPOINTS: Record<string, ResponsiveBreakpoint> = {
  xs: { maxWidth: 480, showItems: 1, gap: 8, buttonSize: 32 },
  sm: { maxWidth: 768, showItems: 2, gap: 12, buttonSize: 36 },
  md: { maxWidth: 1024, showItems: 3, gap: 16, buttonSize: 40 },
  lg: { maxWidth: 1440, showItems: 4, gap: 20, buttonSize: 44 },
  xl: { maxWidth: Infinity, showItems: 5, gap: 24, buttonSize: 48 },
};

/**
 * Hook that manages responsive behavior of the carousel
 *
 * Automatically detects container size changes and applies the appropriate
 * breakpoint configuration. Uses ResizeObserver for optimal performance.
 *
 * @param containerRef - Reference to the carousel container element
 * @param customBreakpoints - Custom breakpoint configuration (merges with defaults)
 * @returns Responsive carousel configuration and dimensions
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null);
 * const { showItems, gap, itemWidth, isReady } = useResponsiveCarousel(
 *   containerRef,
 *   { xs: { showItems: 1 }, lg: { showItems: 4 } }
 * );
 * ```
 */
export const useResponsiveCarousel = (
  containerRef: React.RefObject<HTMLDivElement>,
  customBreakpoints?: ResponsiveConfig
) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentBreakpoint, setCurrentBreakpoint] =
    useState<ResponsiveBreakpoint>(DEFAULT_BREAKPOINTS.lg);
  const resizeObserverRef = useRef<ResizeObserver>();

  // Merge custom breakpoints with defaults
  const breakpoints = useMemo(
    () => ({
      ...DEFAULT_BREAKPOINTS,
      ...Object.entries(customBreakpoints || {}).reduce((acc, [key, value]) => {
        acc[key] = { ...DEFAULT_BREAKPOINTS[key], ...value };
        return acc;
      }, {} as Record<string, ResponsiveBreakpoint>),
    }),
    [customBreakpoints]
  );

  const getCurrentBreakpoint = useCallback(
    (width: number): ResponsiveBreakpoint => {
      const sortedBreakpoints = Object.values(breakpoints).sort(
        (a, b) => a.maxWidth - b.maxWidth
      );

      for (const bp of sortedBreakpoints) {
        if (width <= bp.maxWidth) {
          return bp;
        }
      }

      return sortedBreakpoints[sortedBreakpoints.length - 1];
    },
    [breakpoints]
  );

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);

      if (width > 0) {
        const newBreakpoint = getCurrentBreakpoint(width);
        setCurrentBreakpoint(newBreakpoint);
      }
    }
  }, [getCurrentBreakpoint, containerRef]);

  useEffect(() => {
    updateDimensions();

    // Use ResizeObserver for better performance
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        updateDimensions();
      });

      resizeObserverRef.current.observe(containerRef.current);
    } else {
      // Fallback to window resize
      window.addEventListener("resize", updateDimensions);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      } else {
        window.removeEventListener("resize", updateDimensions);
      }
    };
  }, [containerRef, updateDimensions]);

  const calculateItemWidth = (availableWidth: number, isInfinite?: boolean) => {
    if (availableWidth <= 0) {
      return 0;
    }

    let effectiveShowItems = currentBreakpoint.showItems;

    // No modo infinito, mostra um pouco do próximo item (0.3 do item extra)
    if (isInfinite) {
      effectiveShowItems += 0.3;
    }

    const totalGapSpace =
      currentBreakpoint.gap * (currentBreakpoint.showItems - 1);
    const usableWidth = availableWidth - totalGapSpace;

    // Ensure we don't have negative widths
    if (usableWidth <= 0) {
      console.warn("Carousel: Container too small for current configuration");
      return Math.max(10, availableWidth / currentBreakpoint.showItems);
    }

    return Math.max(0, usableWidth / effectiveShowItems);
  };

  return {
    containerWidth,
    showItems: currentBreakpoint.showItems,
    gap: currentBreakpoint.gap,
    buttonSize: currentBreakpoint.buttonSize,
    itemWidth: calculateItemWidth(containerWidth, false),
    calculateItemWidth: (isInfinite?: boolean) =>
      calculateItemWidth(containerWidth, isInfinite),
    currentBreakpoint: currentBreakpoint.maxWidth,
    isReady: containerWidth > 0,
  };
};
