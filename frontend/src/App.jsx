import React from 'react'
import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Contact from './pages/Contact'
import Doctors from './pages/Doctors'
import Home from './pages/Home'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import Chatbot from './pages/Chatbot'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/chatbot' element={<Chatbot />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App