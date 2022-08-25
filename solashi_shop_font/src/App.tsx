import React, { useContext, useEffect, useState } from 'react';
import { Header } from './components/header/Header';
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
import { AuthMiddleComponent } from './components/middleware/AuthMiddleComponent';
import { AuthContext } from './context/authContext';
import { AuthContextType } from './@types/auth';
import BaseProvider from './context/BaseProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProductDetail } from './pages/ProductDetail';
import { Shop } from './pages/Shop';
import { DashBoard } from './pages/Admin/DashBoard';
import { AdminMiddleware } from './components/middleware/AdminMiddleware';
import { Guest } from './components/layout/Guest';
import { Admin } from './components/layout/Admin';
import { Products } from './pages/Admin/Products';
import { Categoris } from './pages/Admin/Categoris';

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
  const {user, loginStatus} = useContext(AuthContext) as AuthContextType;
  return (
    <ThemeProvider theme={theme}>
      
        <main className='App'>
          <ToastContainer />
          <Routes>
            <Route path='/' element={<Guest><Home /></Guest>} ></Route>
            <Route path='/our-shop' element={<Guest><Shop /></Guest>} ></Route>
            {/* <Route path='/sale' element={<Guest><Sale /></Guest>} ></Route> */}
            {/* <Route path='/services' element={<Home />} ></Route>
            <Route path='/blog' element={<Home />} ></Route> */}
            {/* <Route path='/contact' element={<Home />} ></Route> */}
            <Route path='/detail/:id' element={<Guest><ProductDetail /></Guest>} ></Route>

            {/* Route for Auth */}
            <Route path='/profile' element={<Guest><AuthMiddleComponent><Profile /></AuthMiddleComponent></Guest>} ></Route>
            <Route path='/signin' element={<Guest><Signin /></Guest>} ></Route>
            <Route path='/signup' element={<Guest><Signup /></Guest>} ></Route>

            {/* Route Admin */}
            {/* <Route path='/dashboard' element={<AdminMiddleware><DashBoard /></AdminMiddleware>}></Route> */}
            <Route path='/dashboard' element={<Admin><DashBoard /></Admin>}></Route>
            <Route path='/categoris-manager' element={<Admin><Categoris /></Admin>}></Route>
            <Route path='/products-manager' element={<Admin><Products /></Admin>}></Route>
          </Routes>
        </main>
    </ThemeProvider>

  );
}

export default App;
