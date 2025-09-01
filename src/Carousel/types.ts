import { ResponsiveConfig } from "./hooks/useResponsiveCarousel";

/**
 * Props for the Carousel component
 *
 * @example
 * ```tsx
 * <Carousel
 *   responsive={{
 *     xs: { showItems: 1, gap: 8 },
 *     md: { showItems: 3, gap: 16 }
 *   }}
 *   totalItems={items.length}
 *   infinite
 *   autoplay
 * >
 *   {items.map(item => <div key={item.id}>{item.content}</div>)}
 * </Carousel>
 * ```
 */
export interface CarouselProps {
  /**
   * Responsive breakpoint configuration (recommended)
   * Automatically adapts the carousel to different screen sizes
   */
  responsive?: ResponsiveConfig;

  /**
   * @deprecated Use responsive configuration instead
   * Fixed carousel width in pixels
   */
  carouselWidth?: number;

  /**
   * @deprecated Use responsive configuration instead
   * Number of items to show simultaneously
   */
  showItems?: number;

  /** Total number of items in the carousel */
  totalItems: number;

  /** Unique identifier for the carousel instance */
  name?: string;

  /** Enable infinite loop navigation with partial preview of next item */
  infinite?: boolean;

  /** Enable automatic slideshow */
  autoplay?: boolean;

  /** Autoplay interval in milliseconds (minimum 100ms) */
  autoplayInterval?: number;

  /** Show dot indicators below the carousel */
  showIndicators?: boolean;

  /** Carousel content items */
  children: React.ReactNode;

  /** Accessibility label for screen readers */
  ariaLabel?: string;

  /** ID of element that describes the carousel */
  ariaDescribedBy?: string;

  /** Enable momentum scrolling on drag/swipe */
  enableMomentum?: boolean;

  /** Minimum distance in pixels to trigger swipe (default: 50) */
  swipeThreshold?: number;

  /** Custom navigation icons (future implementation) */
  components?: {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
  };
}
