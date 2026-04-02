import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import ProductDetailPage from './pages/ProductDetail'
import { AuthProvider, useAuth } from './auth/AuthContext'
import CartPage from './pages/CartPage'
import { CartProvider } from './cart/CartContext'
import WIPPage from './pages/WIPPage'
import ProtectedRoute from "./auth/ProtectedRoute"
import CheckoutPage from './pages/CheckoutPage'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <RouteWrapper />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

const RouteWrapper = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/product/:productId'
          element={<ProductDetailPage />}
        />
        <Route path='/work-in-progress' element={<WIPPage />} />
        <Route
          path='/login'
          element={user ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path='/checkout' element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>} />
        <Route
          path='/mycart'
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}
