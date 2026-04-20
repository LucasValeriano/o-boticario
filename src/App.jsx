import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Notification from './components/Notification';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import { CartProvider, useCart } from './context/CartContext';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const { notification, closeNotification } = useCart();
  
  return (
    <div className="min-h-screen bg-[#f9f9f9] font-sans selection:bg-brand-green/10 scroll-smooth">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/pagamento/:orderId" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
      <Notification 
        isVisible={notification.isVisible} 
        message={notification.message} 
        onClose={closeNotification} 
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;

