import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import ProductDetailPage from './pages/ProductDetail'
import { AuthProvider, useAuth } from './auth/AuthContext'
import ProtectedRoute from './auth/ProtectedRoute'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <RouteWrapper />
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
        {
          !user && <Route path='/login' element={<LoginPage />} />
        }
        <Route
          path='/product/:productId'
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  )
}
