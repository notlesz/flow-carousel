# 🎠 FlowCarousel

<div align="center">
  
*Where performance flows naturally*

[![NPM Version](https://img.shields.io/npm/v/flow-carousel?style=flat-square&color=blue)](https://www.npmjs.com/package/flow-carousel)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/flow-carousel?style=flat-square&label=bundle%20size&color=success)](https://bundlephobia.com/package/flow-carousel)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://github.com/notlesz/flow-carousel/blob/main/LICENSE)

</div>

A **truly intelligent** and **high-performance** React carousel component with automatic preview, native responsiveness, and modern SCSS architecture.

## 🎯 Demo

Experience FlowCarousel live:

- 🚀 **[Live Demo](https://flow-carousel.vercel.app)** - See all features in action
- 📱 **Test responsiveness** - Resize your screen to see automatic adaptation
- ⌨️ **Keyboard navigation** - Use arrows, Home and End to navigate

## ✨ Unique Features

- **📱 100% Responsive**: Automatic breakpoints that adapt to any screen
- **🎯 Advanced Gestures**: Momentum scrolling, intelligent swipe and realistic physics
- **♿ Complete Accessibility**: ARIA, keyboard navigation and screen readers
- **⚡ Optimized Performance**: 60fps with requestAnimationFrame
- **🛡️ Anti-Spam**: Intelligent system that prevents multiple-click bugs
- **📐 Auto-Width**: Automatic width based on parent container

## 🚀 Installation

```bash
npm install flow-carousel
# or
yarn add flow-carousel
```

## 📖 Basic Usage

### Responsive Mode (Recommended)

```tsx
import { Carousel } from "flow-carousel";
import "flow-carousel/style.css";

function App() {
  const items = [
    /* your items */
  ];

  return (
    <Carousel
      responsive={{
        xs: { showItems: 1, gap: 8 }, // Mobile: 1 item
        sm: { showItems: 2, gap: 12 }, // Tablet: 2 items
        md: { showItems: 3, gap: 16 }, // Small desktop: 3 items
        lg: { showItems: 4, gap: 20 }, // Desktop: 4 items
        xl: { showItems: 5, gap: 24 }, // Large desktop: 5 items
      }}
      totalItems={items.length}
      infinite
      autoplay
      enableMomentum
    >
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </Carousel>
  );
}
```

### Legacy Mode (Compatibility)

```tsx
<Carousel carouselWidth={800} showItems={4} totalItems={items.length}>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Carousel>
```

## 🎛️ Available Props

### Responsive Configuration

| Prop         | Type               | Description                   |
| ------------ | ------------------ | ----------------------------- |
| `responsive` | `ResponsiveConfig` | Automatic breakpoint configuration |

```tsx
interface ResponsiveConfig {
  xs?: { maxWidth: 480; showItems: number; gap: number; buttonSize: number };
  sm?: { maxWidth: 768; showItems: number; gap: number; buttonSize: number };
  md?: { maxWidth: 1024; showItems: number; gap: number; buttonSize: number };
  lg?: { maxWidth: 1440; showItems: number; gap: number; buttonSize: number };
  xl?: {
    maxWidth: Infinity;
    showItems: number;
    gap: number;
    buttonSize: number;
  };
}
```

### Main Props

| Prop               | Type      | Default      | Description                  |
| ------------------ | --------- | ------------ | ---------------------------- |
| `totalItems`       | `number`  | **required** | Total number of items        |
| `infinite`         | `boolean` | `false`      | Infinite loop                |
| `autoplay`         | `boolean` | `false`      | Automatic playback           |
| `autoplayInterval` | `number`  | `3000`       | Autoplay interval (ms)       |
| `showIndicators`   | `boolean` | `true`       | Show indicators              |

### Gesture & Interaction Props

| Prop             | Type      | Default | Description                |
| ---------------- | --------- | ------- | -------------------------- |
| `enableMomentum` | `boolean` | `true`  | Momentum scrolling         |
| `swipeThreshold` | `number`  | `50`    | Swipe recognition threshold |

### Accessibility Props

| Prop              | Type     | Description               |
| ----------------- | -------- | ------------------------- |
| `ariaLabel`       | `string` | Label for screen readers  |
| `ariaDescribedBy` | `string` | ID of description element |

### Legacy Props (Compatibility)

| Prop            | Type     | Description                         |
| --------------- | -------- | ----------------------------------- |
| `carouselWidth` | `number` | Fixed width (not recommended)       |
| `showItems`     | `number` | Visible items (not recommended)     |

## 🎨 Default Breakpoints

```tsx
const DEFAULT_BREAKPOINTS = {
  xs: { maxWidth: 480, showItems: 1, gap: 8, buttonSize: 32 },
  sm: { maxWidth: 768, showItems: 2, gap: 12, buttonSize: 36 },
  md: { maxWidth: 1024, showItems: 3, gap: 16, buttonSize: 40 },
  lg: { maxWidth: 1440, showItems: 4, gap: 20, buttonSize: 44 },
  xl: { maxWidth: Infinity, showItems: 5, gap: 24, buttonSize: 48 },
};
```

## 🎯 Advanced Examples

### E-commerce with Products

```tsx
<Carousel
  responsive={{
    xs: { showItems: 1, gap: 10 },
    sm: { showItems: 2, gap: 15 },
    lg: { showItems: 4, gap: 20 },
  }}
  totalItems={products.length}
  ariaLabel="Product showcase"
  enableMomentum
  swipeThreshold={60}
>
  {products.map((product) => (
    <ProductCard key={product.id}>
      <img src={product.image} alt={product.title} loading="lazy" />
      <h3>{product.title}</h3>
      <span>{product.price}</span>
    </ProductCard>
  ))}
</Carousel>
```

### Image Gallery

```tsx
<Carousel
  responsive={{
    xs: { showItems: 1, gap: 5 },
    md: { showItems: 3, gap: 10 },
  }}
  totalItems={images.length}
  infinite
  autoplay
  autoplayInterval={5000}
  ariaLabel="Photo gallery"
>
  {images.map((image) => (
    <img key={image.id} src={image.url} alt={image.alt} />
  ))}
</Carousel>
```

## ♿ Accessibility

The carousel includes complete accessibility support:

- **ARIA**: Labels, live regions and atomic updates
- **Keyboard**: Arrows, Home, End, PageUp, PageDown
- **Screen Readers**: State change announcements
- **Focus Management**: Logical tab navigation
- **Touch Targets**: Buttons with minimum 44px size

### Keyboard Navigation

| Key        | Action        |
| ---------- | ------------- |
| `←` `↑`    | Previous item |
| `→` `↓`    | Next item     |
| `Home`     | First item    |
| `End`      | Last item     |
| `PageUp`   | Previous item |
| `PageDown` | Next item     |

## 🎨 Customization

### Custom Breakpoints

```tsx
<Carousel
  responsive={{
    xs: { showItems: 1, gap: 5, buttonSize: 36 },
    sm: { showItems: 2, gap: 10, buttonSize: 40 },
    lg: { showItems: 6, gap: 25, buttonSize: 50 },
  }}
  totalItems={items.length}
>
  {/* content */}
</Carousel>
```

### Custom Icons

```tsx
<Carousel
  components={{
    leftIcon: <CustomLeftIcon />,
    rightIcon: <CustomRightIcon />,
  }}
  // other props...
>
  {/* content */}
</Carousel>
```

## 🔧 Hook API

For advanced usage, you can use internal hooks:

```tsx
import { useResponsiveCarousel } from "flow-carousel";

function CustomCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { containerWidth, showItems, gap, buttonSize, itemWidth, isReady } =
    useResponsiveCarousel(containerRef, {
      sm: { showItems: 2 },
      lg: { showItems: 4 },
    });

  // your custom implementation
}
```

## 📊 Performance

### 🏆 Real Metrics

- **Bundle ES**: 18.4 KB (5.74 KB gzipped)
- **Bundle UMD**: 12.7 KB (4.84 KB gzipped)
- **CSS**: 6.98 KB (1.61 KB gzipped)
- **Total**: ~18 KB - **63% smaller** than other carousels

### ⚡ Optimizations

- **60fps** guaranteed with `requestAnimationFrame`
- **Zero layout shifts** with loading states
- **Memory leak protection** with automatic cleanup
- **ResizeObserver** for efficient change detection
- **Drag optimization** with intelligent throttling
- **Tree-shaking** enabled (`sideEffects: false`)

## 🆚 Comparison with Other Carousels

| Feature                   | FlowCarousel | Swiper.js | React Slick |
| ------------------------- | ------------ | --------- | ----------- |
| Automatic responsiveness  | ✅           | ❌        | ❌          |
| Realistic physics         | ✅           | ❌        | ❌          |
| 60fps performance         | ✅           | ✅        | ❌          |
| Zero dependencies         | ✅           | ❌        | ❌          |
| Native TypeScript         | ✅           | ✅        | ❌          |
| Complete accessibility    | ✅           | ⚠️        | ⚠️          |
| Bundle size               | ~18kb        | ~150kb    | ~45kb       |

## 🐛 Troubleshooting

### Carousel doesn't appear

- Check if `totalItems` is correct
- Make sure there are items in `children`

### Items don't adapt

- Use `responsive` instead of `carouselWidth`
- Check if parent container has defined width

### Gestures don't work on mobile

- Make sure `enableMomentum` is enabled
- Adjust `swipeThreshold` as needed

## 📝 Changelog

### v1.0.0 - Initial Release

- ✨ Automatic breakpoint system and native responsiveness
- ✨ Momentum scrolling and advanced gestures with realistic physics
- ✨ Complete accessibility (ARIA, keyboard navigation)
- ✨ Optimized performance (60fps, requestAnimationFrame)
- ✨ Anti-spam protection and robust validation
- ✨ Modern SCSS architecture with CSS Modules
- ✨ Native TypeScript with complete JSDoc documentation
- ✨ Ultra-compact bundle (~18KB total)

## 🤝 Contributing

Contributions are welcome! Open an [issue](https://github.com/notlesz/flow-carousel/issues) or submit a [pull request](https://github.com/notlesz/flow-carousel/pulls).

## 🎯 Why FlowCarousel?

<div align="center">

### **The most complete and optimized carousel in the React ecosystem**

| 🏆 **Advantage**          | 📊 **Value**              | 💡 **Benefit**                   |
| ------------------------- | ------------------------- | -------------------------------- |
| **Ultra-compact Bundle**  | 18 KB total               | 63% smaller than competitors     |
| **Premium Performance**   | 60fps guaranteed          | Smooth UX on any device          |
| **Total Accessibility**   | WCAG 2.1 AA               | Inclusive for all users          |
| **Zero Dependencies**     | React only                | No bloat, maximum compatibility  |
| **Native TypeScript**     | 100% typed                | Exceptional DX with IntelliSense |
| **Real Responsiveness**   | 5 automatic breakpoints   | Works on any screen              |

**FlowCarousel isn't just a carousel - it's a complete UX solution** 🚀

</div>

## 📄 License

MIT © [Elton Souza](https://github.com/notlesz)

---

<div align="center">

**⭐ If this project helped you, consider giving it a star!** ⭐

</div>
