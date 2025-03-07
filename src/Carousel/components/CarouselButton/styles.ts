import styled from "styled-components";

interface ButtonWrapperProps {
  disabled?: boolean;
}

export const ButtonWrapper = styled.button<ButtonWrapperProps>`
  border: none;
  background-color: transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease;

  &:disabled {
    cursor: not-allowed;

    > *:first-child {
      opacity: 0.5;
    }
  }

  &:not(:disabled):hover {
    opacity: 0.7;
  }

  > *:first-child {
    width: 24px;
    height: 24px;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;
