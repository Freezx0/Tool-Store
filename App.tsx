import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { AIConsultant } from './components/AIConsultant';
import { StoreProvider, useStore } from './store';
import { HomePage } from './pages/Home';
import { CatalogPage } from './pages/Catalog';
import { ProductDetailsPage } from './pages/ProductDetails';
import { AdminPage } from './pages/Admin';
import { CheckoutPage } from './pages/Checkout';
import { PromotionsPage } from './pages/Promotions';
import { BrandsPage } from './pages/Brands';
import { LoginPage } from './pages/Login';
import { RegisterPage } from './pages/Register';
import { NewsPage } from './pages/News';
import { ContactsPage } from './pages/Contacts';
import { SettingsPage } from './pages/Settings';

// Fault-tolerant scroll restoration
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.scrollTo) {
        window.scrollTo(0, 0);
      }
    } catch (e) {}
  }, [pathname]);

  return null;
};

const RequireAuth = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const ProtectedAdminRoute = ({ children }: { children?: React.ReactNode }) => {
  const { user } = useStore();
  
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <AIConsultant />
    </div>
  );
};

const AppRoutes = () => {
  return (
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={
            <RequireAuth>
              <Layout />
            </RequireAuth>
          }>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/promotions" element={<PromotionsPage />} />
            <Route path="/brands" element={<BrandsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            } />
          </Route>
          
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  );
}

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppRoutes />
    </StoreProvider>
  );
};

export default App;