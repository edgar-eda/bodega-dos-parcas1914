import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from './src/context/CategoryContext'; // Importar CategoryProvider
import ScrollToTop from './src/components/ScrollToTop';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HashRouter>
      <ScrollToTop />
      <AuthProvider>
        <CategoryProvider> {/* Envolver ProductProvider e CartProvider com CategoryProvider */}
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </CategoryProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);