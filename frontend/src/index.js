import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup.js';
import Login from './landing_page/signup/Login.js';




import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Navbar from './Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

import { AuthProvider } from './AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <AuthProvider>
  
  <BrowserRouter>

  <Navbar />
  <Routes>
    <Route path="/" element={<HomePage />}  /> 
    <Route path="/signup" element={<Signup />}  /> 
          <Route path="/login" element={<Login />} /> {/* Ensure this route is defined */}

    <Route path="/about" element={<AboutPage />}  /> 
    <Route path="/product" element={<ProductPage />}  /> 
    <Route path="/pricing" element={<PricingPage />}  /> 
    <Route path="/support" element={<SupportPage />}  />  
   
     
    <Route path="*" element={<NotFound />}  />  

  </Routes>
  <Footer />
  </BrowserRouter>
   </AuthProvider>
  </React.StrictMode>
);


