import { Link } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import {
  Container, ListContainer, Overlay, SideBarStyle,
} from './styles';

import sidebar from '../../assets/images/icons/side-bar.svg';
import ReactPortal from '../ReactPortal';
import Button from '../Button';

export default function SideBar({ onToggleTheme }) {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isSideBarVisible);

  function handleToggleSideBar() {
    setIsSideBarVisible(!isSideBarVisible);
  }

  return (
    <>
      <SideBarStyle>
        <Button type="button" onClick={handleToggleSideBar}>
          <img src={sidebar} alt="Side bar" width="28" />
        </Button>
      </SideBarStyle>
      {shouldRender && (
      <ReactPortal containerId="sidebar-root">
        <Overlay
          isLeaving={!isSideBarVisible}
          ref={animatedElementRef}
          onClick={handleToggleSideBar}
        >
          <Container
            isLeaving={!isSideBarVisible}
            ref={animatedElementRef}
            onClick={(event) => event.stopPropagation()}
          >
            <ListContainer
              isLeaving={!isSideBarVisible}
              ref={animatedElementRef}
            >
              <Button type="button" onClick={handleToggleSideBar}>
                <Link to="/">Home</Link>
              </Button>
              <Button type="button" onClick={handleToggleSideBar}>
                <Link to="/new">Novo Contato</Link>
              </Button>
              <Button type="button" onClick={onToggleTheme}>
                <span>Tema</span>
              </Button>
              <Button type="button" onClick={handleToggleSideBar}>
                <Link to="/about">Sobre</Link>
              </Button>
            </ListContainer>
          </Container>
        </Overlay>
      </ReactPortal>
      )}
    </>
  );
}

SideBar.propTypes = {
  onToggleTheme: PropTypes.func.isRequired,
};
