import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme/theme';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { AdminProvider } from './context/AdminContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const basename = import.meta.env.PROD ? '/ecommerce-base-fe' : '/';
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router basename={basename}>
        <AuthProvider>
          <ProductProvider>
            <AdminProvider>
              <CartProvider>
                <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Header />
                  <Box sx={{ flex: 1 }}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/products" element={<ProductsPage />} />
                      <Route path="/product/:productId" element={<ProductDetailPage />} />
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignupPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/admin" element={<AdminDashboard />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </Box>
                  <Footer />
                </Box>
              </CartProvider>
            </AdminProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
