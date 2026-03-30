import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/Login'
import ProductDetailPage from './pages/ProductDetail'

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/:productId' element={<ProductDetailPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App