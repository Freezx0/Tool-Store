import React, { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route, Outlet, useLocation, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Wrapper for routes that require login
const RequireAuth = ({ children }: { children: React.ReactElement }) => {
  const { user } = useStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Wrapper for Admin only routes
const ProtectedAdminRoute = ({ children }: { children: React.ReactNode }) => {
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
    </div>
  );
};

const AppRoutes = () => {
  return (
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Store Routes */}
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
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            
            {/* Admin Route */}
            <Route path="/admin" element={
              <ProtectedAdminRoute>
                <AdminPage />
              </ProtectedAdminRoute>
            } />
          </Route>
          
          {/* Catch all redirect to login */}
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