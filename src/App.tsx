import React from "react";
import Carousel from "./Carousel";
import useCarousel from "./Carousel/hook/use-carousel";

const App = () => {
  const items = [
    {
      nome: "Elton",
      sobrenome: "Souza",
      id: 1,
    },
    {
      nome: "Pedro",
      sobrenome: "Corno",
      id: 2,
    },
    {
      nome: "Pedro",
      sobrenome: "Cornin",
      id: 3,
    },
    {
      nome: "Pedro",
      sobrenome: "Cornao",
      id: 4,
    },
    {
      nome: "Pedro",
      sobrenome: "AAA",
      id: 5,
    },
    {
      nome: "Pedro",
      sobrenome: "GBB",
      id: 6,
    },
  ];

  return (
    <div>
      <Carousel
        carouselWidth={200}
        showItems={4}
        totalItems={items.length}
        name="1"
      >
        {items.map(({ id, nome, sobrenome }) => (
          <div key={id}>
            <p>{nome}</p>
            <p>{sobrenome}</p>
          </div>
        ))}
      </Carousel>
      <Carousel
        carouselWidth={200}
        showItems={1}
        totalItems={items.length}
        name="2"
      >
        {items.map(({ id, nome, sobrenome }) => (
          <div key={id}>
            <p>{nome}</p>
            <p>{sobrenome}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default App;
