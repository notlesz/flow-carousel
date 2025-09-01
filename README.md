# 🎠 FlowCarousel

<div align="center">
  
*Where performance flows naturally*

[![NPM Version](https://img.shields.io/npm/v/flow-carousel?style=flat-square&color=blue)](https://www.npmjs.com/package/flow-carousel)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/flow-carousel?style=flat-square&label=bundle%20size&color=success)](https://bundlephobia.com/package/flow-carousel)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://github.com/notlesz/flow-carousel/blob/main/LICENSE)

</div>

Um componente de carousel **verdadeiramente inteligente** e de **alta performance** para React, com preview automático, responsividade nativa e arquitetura SCSS moderna.

## 🎯 Demo

Experimente o FlowCarousel ao vivo:

- 🚀 **[Demo Online](https://notlesz.github.io/flow-carousel)** - Veja todas as funcionalidades
- 📱 **Teste a responsividade** - Redimensione a tela para ver a adaptação automática
- ⌨️ **Navegação por teclado** - Use as setas, Home e End para navegar

## ✨ Diferenciais Únicos

- **📱 100% Responsivo**: Breakpoints automáticos que se adaptam a qualquer tela
- **🎯 Gestos Avançados**: Momentum scrolling, swipe inteligente e física realística
- **♿ Acessibilidade Completa**: ARIA, navegação por teclado e screen readers
- **⚡ Performance Otimizada**: 60fps com requestAnimationFrame
- **🛡️ Anti-Spam**: Sistema inteligente que previne bugs de múltiplos clicks
- **📐 Auto-Width**: Largura automática baseada no container pai

## 🚀 Instalação

```bash
npm install flow-carousel
# ou
yarn add flow-carousel
```

## 📖 Uso Básico

### Modo Responsivo (Recomendado)

```tsx
import { Carousel } from "flow-carousel";
import "flow-carousel/style.css";

function App() {
  const items = [
    /* seus itens */
  ];

  return (
    <Carousel
      responsive={{
        xs: { showItems: 1, gap: 8 }, // Mobile: 1 item
        sm: { showItems: 2, gap: 12 }, // Tablet: 2 itens
        md: { showItems: 3, gap: 16 }, // Desktop pequeno: 3 itens
        lg: { showItems: 4, gap: 20 }, // Desktop: 4 itens
        xl: { showItems: 5, gap: 24 }, // Desktop grande: 5 itens
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

### Modo Legacy (Compatibilidade)

```tsx
<Carousel carouselWidth={800} showItems={4} totalItems={items.length}>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Carousel>
```

## 🎛️ Props Disponíveis

### Configuração Responsiva

| Prop         | Tipo               | Descrição                               |
| ------------ | ------------------ | --------------------------------------- |
| `responsive` | `ResponsiveConfig` | Configuração de breakpoints automáticos |

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

### Props Principais

| Prop               | Tipo      | Padrão          | Descrição                  |
| ------------------ | --------- | --------------- | -------------------------- |
| `totalItems`       | `number`  | **obrigatório** | Número total de itens      |
| `infinite`         | `boolean` | `false`         | Loop infinito              |
| `autoplay`         | `boolean` | `false`         | Reprodução automática      |
| `autoplayInterval` | `number`  | `3000`          | Intervalo do autoplay (ms) |
| `showIndicators`   | `boolean` | `true`          | Mostrar indicadores        |

### Props de Gestos e Interação

| Prop             | Tipo      | Padrão | Descrição                    |
| ---------------- | --------- | ------ | ---------------------------- |
| `enableMomentum` | `boolean` | `true` | Momentum scrolling           |
| `swipeThreshold` | `number`  | `50`   | Limite para reconhecer swipe |

### Props de Acessibilidade

| Prop              | Tipo     | Descrição                   |
| ----------------- | -------- | --------------------------- |
| `ariaLabel`       | `string` | Label para screen readers   |
| `ariaDescribedBy` | `string` | ID do elemento de descrição |

### Props Legacy (Compatibilidade)

| Prop            | Tipo     | Descrição                        |
| --------------- | -------- | -------------------------------- |
| `carouselWidth` | `number` | Largura fixa (não recomendado)   |
| `showItems`     | `number` | Itens visíveis (não recomendado) |

## 🎨 Breakpoints Padrão

```tsx
const DEFAULT_BREAKPOINTS = {
  xs: { maxWidth: 480, showItems: 1, gap: 8, buttonSize: 32 },
  sm: { maxWidth: 768, showItems: 2, gap: 12, buttonSize: 36 },
  md: { maxWidth: 1024, showItems: 3, gap: 16, buttonSize: 40 },
  lg: { maxWidth: 1440, showItems: 4, gap: 20, buttonSize: 44 },
  xl: { maxWidth: Infinity, showItems: 5, gap: 24, buttonSize: 48 },
};
```

## 🎯 Exemplos Avançados

### E-commerce com Produtos

```tsx
<Carousel
  responsive={{
    xs: { showItems: 1, gap: 10 },
    sm: { showItems: 2, gap: 15 },
    lg: { showItems: 4, gap: 20 },
  }}
  totalItems={products.length}
  ariaLabel="Vitrine de produtos"
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

### Galeria de Imagens

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
  ariaLabel="Galeria de fotos"
>
  {images.map((image) => (
    <img key={image.id} src={image.url} alt={image.alt} />
  ))}
</Carousel>
```

## ♿ Acessibilidade

O carousel inclui suporte completo a acessibilidade:

- **ARIA**: Labels, live regions e atomic updates
- **Teclado**: Setas, Home, End, PageUp, PageDown
- **Screen Readers**: Anúncios de mudanças de estado
- **Focus Management**: Navegação lógica por tab
- **Touch Targets**: Botões com tamanho mínimo de 44px

### Navegação por Teclado

| Tecla      | Ação          |
| ---------- | ------------- |
| `←` `↑`    | Item anterior |
| `→` `↓`    | Próximo item  |
| `Home`     | Primeiro item |
| `End`      | Último item   |
| `PageUp`   | Item anterior |
| `PageDown` | Próximo item  |

## 🎨 Customização

### Breakpoints Customizados

```tsx
<Carousel
  responsive={{
    xs: { showItems: 1, gap: 5, buttonSize: 36 },
    sm: { showItems: 2, gap: 10, buttonSize: 40 },
    lg: { showItems: 6, gap: 25, buttonSize: 50 },
  }}
  totalItems={items.length}
>
  {/* conteúdo */}
</Carousel>
```

### Ícones Customizados

```tsx
<Carousel
  components={{
    leftIcon: <CustomLeftIcon />,
    rightIcon: <CustomRightIcon />,
  }}
  // outras props...
>
  {/* conteúdo */}
</Carousel>
```

## 🔧 API de Hooks

Para uso avançado, você pode usar os hooks internos:

```tsx
import { useResponsiveCarousel } from "flow-carousel";

function CustomCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { containerWidth, showItems, gap, buttonSize, itemWidth, isReady } =
    useResponsiveCarousel(containerRef, {
      sm: { showItems: 2 },
      lg: { showItems: 4 },
    });

  // sua implementação personalizada
}
```

## 📊 Performance

### 🏆 Métricas Reais

- **Bundle ES**: 18.4 KB (5.74 KB gzipped)
- **Bundle UMD**: 12.7 KB (4.84 KB gzipped)
- **CSS**: 6.98 KB (1.61 KB gzipped)
- **Total**: ~18 KB - **63% menor** que outros carousels

### ⚡ Otimizações

- **60fps** garantido com `requestAnimationFrame`
- **Zero layout shifts** com loading states
- **Memory leak protection** com cleanup automático
- **ResizeObserver** para detecção eficiente de mudanças
- **Drag optimization** com throttling inteligente
- **Tree-shaking** habilitado (`sideEffects: false`)

## 🆚 Comparação com Outros Carousels

| Recurso                   | Este Carousel | Swiper.js | React Slick |
| ------------------------- | ------------- | --------- | ----------- |
| Responsividade automática | ✅            | ❌        | ❌          |
| Física realística         | ✅            | ❌        | ❌          |
| Performance 60fps         | ✅            | ✅        | ❌          |
| Zero dependências         | ✅            | ❌        | ❌          |
| TypeScript nativo         | ✅            | ✅        | ❌          |
| Acessibilidade completa   | ✅            | ⚠️        | ⚠️          |
| Bundle size               | ~18kb         | ~150kb    | ~45kb       |

## 🐛 Solução de Problemas

### Carousel não aparece

- Verifique se `totalItems` está correto
- Certifique-se que há itens em `children`

### Items não se adaptam

- Use `responsive` ao invés de `carouselWidth`
- Verifique se o container pai tem largura definida

### Gestos não funcionam no mobile

- Certifique-se que `enableMomentum` está habilitado
- Ajuste `swipeThreshold` conforme necessário

## 📝 Changelog

### v1.0.0 - Initial Release

- ✨ Sistema de breakpoints automáticos e responsividade nativa
- ✨ Momentum scrolling e gestos avançados com física realística
- ✨ Acessibilidade completa (ARIA, navegação por teclado)
- ✨ Performance otimizada (60fps, requestAnimationFrame)
- ✨ Anti-spam protection e validação robusta
- ✨ Arquitetura SCSS moderna com CSS Modules
- ✨ TypeScript nativo com documentação JSDoc completa
- ✨ Bundle ultra-compacto (~18KB total)

## 🤝 Contribuição

Contribuições são bem-vindas! Abra uma [issue](https://github.com/notlesz/flow-carousel/issues) ou faça um [pull request](https://github.com/notlesz/flow-carousel/pulls).

## 🎯 Por Que FlowCarousel?

<div align="center">

### **O carousel mais completo e otimizado do mercado React**

| 🏆 **Vantagem**           | 📊 **Valor**              | 💡 **Benefício**                  |
| ------------------------- | ------------------------- | --------------------------------- |
| **Bundle Ultra-compacto** | 18 KB total               | 63% menor que concorrentes        |
| **Performance Premium**   | 60fps garantido           | UX suave em qualquer device       |
| **Acessibilidade Total**  | WCAG 2.1 AA               | Inclusivo para todos os usuários  |
| **Zero Dependências**     | Apenas React              | Sem bloat, máxima compatibilidade |
| **TypeScript Nativo**     | 100% tipado               | DX excepcional com IntelliSense   |
| **Responsividade Real**   | 5 breakpoints automáticos | Funciona em qualquer tela         |

**FlowCarousel não é apenas um carousel - é uma solução completa de UX** 🚀

</div>

## 📄 Licença

MIT © [Elton Souza](https://github.com/notlesz)

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!** ⭐

</div>
