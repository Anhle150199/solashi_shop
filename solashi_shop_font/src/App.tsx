import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Container } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sale } from './pages/Sale';
import { Home } from './pages/Home';
import { Signup } from './pages/Auth/Signup';
import { Signin } from './pages/Auth/Signin';
import { Footer } from './components/Footer';
import { Profile } from './pages/Auth/Profile';
// import { User } from './stores/User';
// import { loginSelector } from "./redux/selectors";
// import { useSelector } from 'react-redux';
import AuthProvider from './context/authContext';
import { AuthMiddleComponent } from './components/AuthMiddleComponent';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Josefin Sans',
    },
  },
  palette: {
    secondary: {
      main: "#bdbdbd",
    },
  },

});

function App() {
  // const login = useSelector(loginSelector);
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <main className='App'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/shop' element={<Home />} ></Route>
            <Route path='/sale' element={<Home />} ></Route>
            <Route path='/services' element={<Home />} ></Route>
            <Route path='/blog' element={<Home />} ></Route>
            <Route path='/contact' element={<Home />} ></Route>

            <Route path='/profile' element={<AuthMiddleComponent><Profile /></AuthMiddleComponent>} ></Route>
            <Route path='/signin' element={<Signin />} ></Route>
            <Route path='/signup' element={<Signup />} ></Route>
          </Routes>
          <Footer />
        </main>
      </AuthProvider>
    </ThemeProvider>

  );
}

export default App;
