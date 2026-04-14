import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import Vault from './pages/Vault'
import AddPassword from './pages/AddPassword'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import PasswordDetail from './pages/PasswordDetail'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        <Route path='/vault' element={<PrivateRoute><Vault /></PrivateRoute>} />
        <Route path='/password/:vaultID' element={<PrivateRoute><PasswordDetail /></PrivateRoute>} />
        <Route path='/add' element={<PrivateRoute><AddPassword /></PrivateRoute>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App