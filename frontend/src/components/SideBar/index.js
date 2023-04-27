import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

import {
  Container, ListContainer, Overlay, SideBarStyle,
} from './styles';

import sidebar from '../../assets/images/icons/side-bar.svg';
import ReactPortal from '../ReactPortal';
import Button from '../Button';

export default function SideBar({ visible, onToggleCloseSideBar }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(visible);

  console.log({ visible, shouldRender });

  return (
    <>
      <SideBarStyle>
        <Button type="button" onClick={onToggleCloseSideBar}>
          <img src={sidebar} alt="Side bar" width="28" />
        </Button>
      </SideBarStyle>
      {shouldRender && (
      <ReactPortal containerId="sidebar-root">
        <Overlay enable={visible}>
          <Container
            enable={visible}
            isLeaving={!visible}
            ref={animatedElementRef}
          >
            <ListContainer>
              {visible && (
                <>
                  <Button type="button">
                    <Link to="/">Home</Link>
                  </Button>
                  <Button type="button">
                    <Link to="/new">Novo Contato</Link>
                  </Button>
                  <Button type="button">
                    <Link to="/new">Novo Contato</Link>
                  </Button>
                  <Button type="button">
                    <Link to="/new">Novo Contato</Link>
                  </Button>
                  <Button type="button">
                    <Link to="/new">Novo Contato</Link>
                  </Button>
                </>
              )}
            </ListContainer>
          </Container>
        </Overlay>
      </ReactPortal>
      )}
    </>
  );
}

SideBar.propTypes = {
  visible: PropTypes.bool.isRequired,
  onToggleCloseSideBar: PropTypes.func.isRequired,
};
