import styled from "styled-components";
import { Carousel } from "./Carousel";

const ProductCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  margin: 10px;
`;

const ProductImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
`;

const ProductPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #2ecc71;
  margin-bottom: 12px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  text-align: center;
`;

const BuyButton = styled.button`
  background: #2ecc71;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.2s;

  &:hover {
    background: #27ae60;
  }
`;

const SimpleCard = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const App = () => {
  const items = [
    { id: 1, nome: "João", sobrenome: "Silva" },
    { id: 2, nome: "Maria", sobrenome: "Santos" },
    { id: 3, nome: "Pedro", sobrenome: "Oliveira" },
    { id: 4, nome: "Ana", sobrenome: "Souza" },
    { id: 5, nome: "Lucas", sobrenome: "Ferreira" },
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
  ];

  const handleBuy = (productId: number) => {
    alert(`Produto ${productId} adicionado ao carrinho!`);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
        Carousel Simples
      </h1>

      <Carousel
        carouselWidth={600}
        showItems={4}
        totalItems={items.length}
        name="simple-carousel"
        // infinite
      >
        {items.map(({ id, nome, sobrenome }) => (
          <SimpleCard key={id}>
            <h3 style={{ margin: "0 0 10px 0", color: "#444" }}>{nome}</h3>
            <p style={{ margin: 0, color: "#666" }}>{sobrenome}</p>
          </SimpleCard>
        ))}
      </Carousel>

      <h1 style={{ textAlign: "center", margin: "60px 0 40px", color: "#333" }}>
        Produtos em Destaque
      </h1>

      {}

      <Carousel
        carouselWidth={900}
        showItems={4}
        totalItems={products.length}
        name="products-carousel"
        // infinite
      >
        {products.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <ProductPrice>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            <BuyButton onClick={() => handleBuy(product.id)}>
              Comprar Agora
            </BuyButton>
          </ProductCard>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
