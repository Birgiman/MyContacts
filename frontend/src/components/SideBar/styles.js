import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {transform: translateX(100%);}
  100% {transform: translateX(0);}
`;

const fadeOut = keyframes`
  0% {transform: translateX(0);}
  100% {transform: translateX(100%);}
`;

export const SideBarStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: end;
  top: 32px;
  right: 22px;
  z-index: 1;


  > Button {
    background: none;
    height: 24px;
    padding: 0;
    box-shadow: none;
    border-radius: none;

    &:hover {
    background: none;
  }
  }
`;

export const Overlay = styled.div`

  ${({ enable }) => enable && css`
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  `}

`;

export const Container = styled.div`

${({ enable }) => enable && css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 4px;

  background: rgb(0, 0, 0, 0.2);
  width: 100%;
  max-width: 300px;
  height: 100%;
  margin-top: 24px;
  `}

  animation: ${fadeIn} 0.5s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.5s forwards;
  `}
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 200px;

  margin-top: 48px;

  Button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0;
    border-radius: 8px;
    background: none;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};

    font-weight: normal;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      border-color: #fff;;
    }

    &:active {
      background: ${({ theme }) => theme.colors.primary.dark};
    }

    &[disabled] {
      background: #ccc !important;
      cursor: default !important;
      min-width: 92.66px;
    }
  }
  Button + Button {
    margin-top: 16px;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary.main};

    &:hover {
    color: #fff;
    }
    &:active {
      color: #fff;
    }
  }


`;
