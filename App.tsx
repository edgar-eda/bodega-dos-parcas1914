import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
              <Header />
              <main className="flex-grow pt-20">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route 
                    path="/admin" 
                    element={
                      <PrivateRoute>
                        <AdminPage />
                      </PrivateRoute>
                    } 
                  />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;