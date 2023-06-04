import React from "react";

interface ICarouselContext {
  dislocate: number;
}

const CarouselContext = React.createContext<ICarouselContext>();
