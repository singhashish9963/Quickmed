import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import {toast} from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const {setDToken}=useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    // console.log('Form submitted') // Debugging statement
    // alert('Form submitted') // Debugging statement
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/login`, { email, password })
        console.log('Response data:', data) // Debugging statement
        if (data.success) {
            localStorage.setItem('aToken',data.token)
          setAToken(data.token)
        } else {
        //   console.log('Login failed:', data.message) // Debugging statement
        //   alert('Login failed: ' + data.message) // Debugging statement
        toast.error(data.message)
        }
      } else {
        console.log('Doctor login') // Debugging statement
        // Handle doctor login
        const {data}=await axios.post(backendUrl+'/api/doctor/login',{email,password})
        console.log('Response data:', data) // Debugging statement
        if (data.success) {
            localStorage.setItem('dToken',data.token)
          setDToken(data.token)
          console.log(data.token)
        } else {
          // console.log('Login failed:', data.message) // Debugging statement
          // alert('Login failed: ' + data.message) // Debugging statement
        toast.error(data.message)
        }
      }
    } catch (error) {
      console.error('Error:', error) // Debugging statement
      alert('Error occurred: ' + error.message) // Debugging statement
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-gray-800 text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'><span className='text-primary'>{state}</span> Login </p>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-gray-200 rounded w-full pt-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-gray-200 rounded w-full pt-2 mt-1' type="password" required />
        </div>
        <button className=' cursor-pointer bg-primary text-white w-full py-2 rounded-md text-base'>Login</button>
        {
          state === 'Admin'
            ? <p>Doctor Login? <span className='  text-blue-700 cursor-pointer underline' onClick={() => setState('Doctor')}>Click here</span></p>
            : <p>Admin login? <span className='  text-blue-700 cursor-pointer underline' onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login