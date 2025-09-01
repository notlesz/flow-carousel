import React from "react";
import styles from "./CarouselItemWrapper.module.scss";

interface CarouselItemWrapperProps {
  width: number;
  children: React.ReactNode;
}

export const CarouselItemWrapper: React.FC<CarouselItemWrapperProps> = ({
  width,
  children,
}) => {
  return (
    <div
      className={styles.wrapper}
      style={{
        width: `${width}px`,
        minWidth: `${width}px`,
        flexBasis: `${width}px`,
      }}
    >
      {children}
    </div>
  );
};
