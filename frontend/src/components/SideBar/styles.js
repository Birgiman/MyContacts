import styled, { css, keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {transform: translateX(100%);}
  100% {transform: translateX(0);}
`;

const overlayFadeIn = keyframes`
  0% {backdrop-filter: blur();}
  100% {backdrop-filter: blur(5px);}
`;

const ListContainerFadeIn = keyframes`
  0% {transform: translateX(100%);}
  70% {transform: translateX(-15%)}
  100% {transform: translateX(0);}
`;

const fadeOut = keyframes`
  0% {transform: translateX(0);}
  40% {transform: translateX(0)}
  100% {transform: translateX(100%);}
`;

const ListContainerAnimation = keyframes`
  0% {transform: translateX(0);}
  30% {transform: translateX(-15%)}
  100% {transform: translateX(100%);}
`;

const overlayFadeOut = keyframes`
  0% {backdrop-filter: blur(5px);}
  100% {backdrop-filter: blur();}
`;

export const SideBarStyle = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: end;
  top: 42px;
  right: 50px;
  z-index: 1;



  > Button {
    background: none;
    height: 24px;
    padding: 0;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);

    &:hover {
    background: none;
  }
  }
`;

export const Overlay = styled.div`
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

  animation: ${overlayFadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${overlayFadeOut} 0.2s forwards;
  `}

`;

export const Container = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  border-radius: 4px;

  background: rgb(0, 0, 0, 0.2);
  width: 100%;
  max-width: 300px;
  height: 100%;


  animation: ${fadeIn} 0.3s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${fadeOut} 0.3s forwards;
  `}
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  max-width: 200px;
  height: 100%;
  margin-top: 106px;
  animation: ${ListContainerFadeIn} 0.5s;

  ${({ isLeaving }) => isLeaving && css`
    animation: ${ListContainerAnimation} 0.2s forwards;
  `}

  Button {
    display: flex;
    align-items: center;
    width: 100%;
    height: 42px;
    padding: 0;
    border-radius: 8px;
    background: none;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
    border: 2px solid ${({ theme }) => theme.colors.primary.main};

    font-weight: normal;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      border-color: #fff;;
    }

    &:active {
      background: ${({ theme }) => theme.colors.primary.dark};
    }

    ${({ disable }) => disable && css`
    cursor: default;
    background: red;
  `}

  }

  Button + Button {
    margin-top: 16px;
  }

  Button:last-of-type {
  margin-top: auto;
  margin-bottom: 48px;
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
