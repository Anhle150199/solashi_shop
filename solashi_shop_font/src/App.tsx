import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
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
import { AuthContext } from './context/authContext';
import { AuthContextType } from './@types/auth';
import BaseProvider from './context/BaseProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductDetail } from './pages/ProductDetail';

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
      <BaseProvider>
        <main className='App'>
          <ToastContainer/>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} ></Route>
            <Route path='/our-shop' element={<Home />} ></Route>
            <Route path='/sale' element={<Sale />} ></Route>
            <Route path='/services' element={<Home />} ></Route>
            <Route path='/blog' element={<Home />} ></Route>
            <Route path='/contact' element={<Home />} ></Route>
            <Route path='/detail/:id' element={<ProductDetail />} ></Route>

            <Route path='/profile' element={<AuthMiddleComponent><Profile /></AuthMiddleComponent>} ></Route>
            <Route path='/signin' element={<Signin />} ></Route>
            <Route path='/signup' element={<Signup />} ></Route>
          </Routes>
          <Footer />
        </main>
      </BaseProvider>
    </ThemeProvider>

  );
}

export default App;
