import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MuiTypography } from './components/MuiTypography';
import { Header } from './components/Header';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Josefin Sans',
    },

  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Header/>
    </ThemeProvider>
  );
}

export default App;
