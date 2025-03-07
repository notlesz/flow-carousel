import styled from "styled-components";

export const IndicatorsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

export const IndicatorDot = styled.button<{ active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background-color: ${({ active }) => (active ? "#000" : "#ccc")};
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#000" : "#999")};
  }
`;
