import styled from "styled-components";

export const CarouselWrapper = styled.div`
  display: flex;
  gap: 10px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
export const CarouselContainer = styled.div<{ width: number | string }>`
  width: ${({ width }) => {
    if (typeof width === "string") {
      return width;
    }

    return `${width}px`;
  }};
  overflow: hidden;
`;
export const CarouselBody = styled.div<{
  width: number;
  itemWidth: number;
  typeChildren?: string;
}>`
  display: flex;
  align-items: center;
  list-style: none;
  width: ${({ width }) => width}px;

  & > ${({ typeChildren }) => typeChildren} {
    width: ${({ itemWidth }) => itemWidth}px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;
