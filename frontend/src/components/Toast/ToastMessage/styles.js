import styled, { css, keyframes } from 'styled-components';

const messageIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;
const messageOut = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(100px);
  }
`;

const containerVariants = {
  default: css`background: ${({ theme }) => theme.colors.primary.main};`,
  success: css`background: ${({ theme }) => theme.colors.success.main};`,
  danger: css`background: ${({ theme }) => theme.colors.danger.main};`,
};

export const Container = styled.div`
  padding: 16px 32px;
  background: ${({ theme }) => theme.colors.primary.main};
  color: #fff;
  border-radius: 4px;
  box-shadow: 0px 20px 20px -16px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  animation: ${messageIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${messageOut} 0.2s forwards;
  `}

  ${({ type }) => containerVariants[type] || containerVariants.default}

  img {
    margin-right: 8px;
  }

  & + & {
    margin-top: 12px;
  }
`;
