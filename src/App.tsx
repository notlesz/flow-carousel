import { Carousel } from "./Carousel";
import styles from "./LandingPage.module.scss";

const App = () => {
  const items = [
    { id: 1, nome: "João", sobrenome: "Silva" },
    { id: 2, nome: "Maria", sobrenome: "Santos" },
    { id: 3, nome: "Pedro", sobrenome: "Oliveira" },
    { id: 4, nome: "Ana", sobrenome: "Souza" },
    { id: 5, nome: "Lucas", sobrenome: "Ferreira" },
    { id: 6, nome: "Carlos", sobrenome: "Lima" },
    { id: 7, nome: "Beatriz", sobrenome: "Costa" },
    { id: 8, nome: "Rafael", sobrenome: "Almeida" },
  ];

  const products = [
    {
      id: 1,
      title: "Headphone Bluetooth",
      price: 299.99,
      image: "https://picsum.photos/200/200?random=1",
      description: "Fone de ouvido sem fio com cancelamento de ruído",
    },
    {
      id: 2,
      title: "Smartwatch Pro",
      price: 499.99,
      image: "https://picsum.photos/200/200?random=2",
      description: "Relógio inteligente com monitor cardíaco",
    },
    {
      id: 3,
      title: "Câmera DSLR",
      price: 1999.99,
      image: "https://picsum.photos/200/200?random=3",
      description: "Câmera profissional com lente 18-55mm",
    },
    {
      id: 4,
      title: "Notebook Ultra",
      price: 3999.99,
      image: "https://picsum.photos/200/200?random=4",
      description: "Notebook leve e potente com SSD 512GB",
    },
    {
      id: 5,
      title: "Tablet Pro",
      price: 1499.99,
      image: "https://picsum.photos/200/200?random=5",
      description: 'Tablet com tela 10.5" e suporte a caneta',
    },
    {
      id: 6,
      title: "Mouse Gamer",
      price: 149.99,
      image: "https://picsum.photos/200/200?random=6",
      description: "Mouse óptico com 12.000 DPI e RGB",
    },
    {
      id: 7,
      title: "Teclado Mecânico",
      price: 399.99,
      image: "https://picsum.photos/200/200?random=7",
      description: "Teclado mecânico com switches blue",
    },
    {
      id: 8,
      title: "Monitor 4K",
      price: 1299.99,
      image: "https://picsum.photos/200/200?random=8",
      description: "Monitor 27 polegadas 4K HDR",
    },
  ];

  const handleBuy = (productId: number) => {
    alert(`Produto ${productId} adicionado ao carrinho!`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎠 Carousel Responsivo - Nova Geração</h1>

      {/* Demonstração do modo responsivo automático */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          📱 Carousel Totalmente Responsivo
        </h2>
        <p className={styles.sectionDescription}>
          Redimensione a janela para ver a adaptação automática!
        </p>

        <Carousel
          responsive={{
            xs: { showItems: 1, gap: 8 }, // Mobile: 1 item
            sm: { showItems: 2, gap: 12 }, // Tablet: 2 itens
            md: { showItems: 3, gap: 16 }, // Desktop: 3 itens (padrão)
            lg: { showItems: 3, gap: 20 }, // Desktop: 3 itens (padrão)
            xl: { showItems: 3, gap: 24 }, // Desktop grande: 3 itens (padrão)
          }}
          totalItems={items.length}
          name="responsive-people"
          infinite={false}
          autoplay
          autoplayInterval={4000}
          ariaLabel="Carousel padrão com 3 itens por página"
          enableMomentum
          swipeThreshold={40}
        >
          {items.map(({ id, nome, sobrenome }) => (
            <div key={id} className={styles.simpleCard}>
              <h3>{nome}</h3>
              <p>{sobrenome}</p>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Demonstração de produtos com configuração personalizada */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          🛍️ Vitrine de Produtos (Modo Infinito)
        </h2>
        <p className={styles.sectionDescription}>
          Com preview do próximo item e navegação infinita
        </p>

        <Carousel
          responsive={{
            xs: { showItems: 1, gap: 10, buttonSize: 40 },
            sm: { showItems: 2, gap: 15, buttonSize: 42 },
            md: { showItems: 3, gap: 18, buttonSize: 44 }, // 3 itens + preview
            lg: { showItems: 3, gap: 20, buttonSize: 46 }, // 3 itens + preview
            xl: { showItems: 3, gap: 24, buttonSize: 48 }, // 3 itens + preview
          }}
          totalItems={products.length}
          name="products-showcase"
          infinite={true}
          ariaLabel="Vitrine infinita de produtos com preview"
          enableMomentum
          swipeThreshold={60}
        >
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <img
                className={styles.productImage}
                src={product.image}
                alt={product.title}
                loading="lazy"
              />
              <h3 className={styles.productTitle}>{product.title}</h3>
              <span className={styles.productPrice}>
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
              <p className={styles.productDescription}>{product.description}</p>
              <button
                className={styles.buyButton}
                onClick={() => handleBuy(product.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleBuy(product.id);
                  }
                }}
              >
                Comprar Agora
              </button>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Seção de recursos */}
      <section className={styles.featuresSection}>
        <h3 className={styles.featuresTitle}>✨ Recursos da Nova Versão</h3>
        <div className={styles.featuresGrid}>
          <div className={styles.featureItem}>
            <h4>📱 Totalmente Responsivo</h4>
            <p>Padrão 3 itens por página, adapta-se a qualquer tela</p>
          </div>
          <div className={styles.featureItem}>
            <h4>🔄 Modo Infinito Inteligente</h4>
            <p>Preview parcial do próximo item, sem indicadores</p>
          </div>
          <div className={styles.featureItem}>
            <h4>🎯 Gestos Avançados</h4>
            <p>Momentum scrolling e swipe inteligente</p>
          </div>
          <div className={styles.featureItem}>
            <h4>♿ Acessibilidade</h4>
            <p>ARIA completo e navegação por teclado (Home/End)</p>
          </div>
          <div className={styles.featureItem}>
            <h4>⚡ Performance</h4>
            <p>60fps com requestAnimationFrame</p>
          </div>
          <div className={styles.featureItem}>
            <h4>🎛️ Controle Intuitivo</h4>
            <p>Indicadores automáticos ou navegação livre</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
