import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import { Container } from './styles';

import Header from '../Header';
import Router from '../../Router';
import ToastContainer from '../Toast/ToastContainer';
import SideBar from '../SideBar';
import useHome from '../../pages/Home/useHome';

function App() {
  const {
    hasError,
    isLoading,
  } = useHome();

  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          {!hasError && !isLoading && <SideBar />}
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
