import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../common/Footer';
import LoginPage from './LoginPage';
import Home from './Home';
import { CartProvider } from '../context/CartContext';
import RegisterPage from './RegisterPage';
import ProfilePage from './ProfilePage';
import ProductDetailsPage from './ProductDetailsPage';
import CategoryListPage from './CategoryListPage';
import CategoryProductsPage from './CategoryProductsPage';
import CartPage from './CartPage';
import AddressPage from './AddressPage';
import { ProtectedRoute,AdminRoute } from '../../services/Guard';


const Test = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/product/:productId' element={<ProductDetailsPage/>} />
          <Route path='/categories' element={<CategoryListPage/>}/>
          <Route path='/category/:categoryId' element={<CategoryProductsPage/>} />
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>

          <Route path='/profile' element={<ProtectedRoute element={<ProfilePage/>} />} />
          <Route path='/add-address' element={<ProtectedRoute element={<AddressPage/>} />} />
          <Route path='/edit-address' element={<ProtectedRoute element={<AddressPage/>} />} />
        </Routes>
        <Footer />
      </CartProvider>
    </Router>
  );
};

export default Test;
