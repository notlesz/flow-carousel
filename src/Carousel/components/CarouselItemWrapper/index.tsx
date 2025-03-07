import styled from "styled-components";

export const CarouselItemWrapper = styled.div<{ width: number }>`
  width: ${({ width }) => width}px;
  min-width: ${({ width }) => width}px;
  flex: 0 0 ${({ width }) => width}px;
  text-align: center;
  user-select: none;
`;
