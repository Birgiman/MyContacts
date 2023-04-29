import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { useState } from 'react';
import GlobalStyles from '../../assets/styles/global';
import light from '../../assets/styles/themes/light';
import dark from '../../assets/styles/themes/dark';
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

  const [theme, setTheme] = useState('light');

  function handleToogleTheme() {
    let selectedTheme;
    if (theme) {
      selectedTheme = theme === 'light'
        ? setTheme('dark')
        : setTheme('light');
    }
    return selectedTheme;
  }

  const themeObject = theme === 'light' ? light : dark;

  return (
    <BrowserRouter>
      <ThemeProvider theme={themeObject}>
        <GlobalStyles />
        <ToastContainer />
        <Container>
          {!hasError && !isLoading
          && <SideBar onToggleTheme={handleToogleTheme} />}
          <Header />
          <Router />
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
