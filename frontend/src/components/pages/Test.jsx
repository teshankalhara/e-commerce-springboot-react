import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../common/Footer';
import LoginPage from './LoginPage';
import Home from './Home';
import { CartProvider } from '../context/CartContext';
import RegisterPage from './RegisterPage';

const Test = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default Test;
