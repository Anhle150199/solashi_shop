import React, { useState } from 'react';
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
  const [login, setLogin] = useState<boolean>();
  
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Header setLogin={setLogin} login={login} />
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/shop' element={<Home />} ></Route>
          <Route path='/sale' element={<Home />} ></Route>
          <Route path='/services' element={<Home />} ></Route>
          <Route path='/blog' element={<Home />} ></Route>
          <Route path='/contact' element={<Home />} ></Route>
          <Route path='/signin' element={<Signin setLogin={setLogin} login={login} />} ></Route>
          <Route path='/signup' element={<Signup />} ></Route>
          <Route path='/profile' element={<Profile />} ></Route>
        </Routes>
        <Footer/>
      </div>
    </ThemeProvider>

  );
}

export default App;
