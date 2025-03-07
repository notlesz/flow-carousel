import styled from "styled-components";
import {
  ANIMATION_EASING,
  CAROUSEL_GAP,
  TRANSITION_DURATION,
} from "../../../constants";
import { ContentProps } from "./types";

export const Container = styled.div<{
  width: number | string;
  isDragging: boolean;
}>`
  width: ${({ width }) => (typeof width === "string" ? width : `${width}px`)};
  overflow: hidden;
  cursor: ${({ isDragging }) => (isDragging ? "grabbing" : "grab")};
  touch-action: pan-y pinch-zoom;
  -webkit-overflow-scrolling: touch;
  position: relative;
  z-index: 1;
  user-select: none;
  -webkit-user-select: none;
`;

export const Content = styled.div<ContentProps>`
  display: flex;
  gap: ${CAROUSEL_GAP}px;
  transform: translateX(
    ${({ dislocate, dragOffset }) => -(dislocate + dragOffset)}px
  );
  transition: ${({ isDragging }) =>
    isDragging
      ? "none"
      : `transform ${TRANSITION_DURATION}ms ${ANIMATION_EASING}`};
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  perspective: 1000;
  -webkit-perspective: 1000;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  touch-action: pan-y pinch-zoom;
`;
