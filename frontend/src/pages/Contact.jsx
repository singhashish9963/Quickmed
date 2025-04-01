import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-800'>
        <p>CONTACT US</p>
      </div>
      <div className='my-10 flex flec-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
            <p className='font-bold text-xl'>OUR OFFICE</p>
            <p>Lorem ipsum, dolor sit amet consectetur <br />adipisicing elit. Corrupti, tempora quibusdam. Fuga.</p>
            <p className='font-bold'>Tel:4563222332125 <br />Email:myapp@gail.com</p>
            <p>Careers at PRESCRIPTION</p>
            <p>learn more about our teams and job openings</p>
            <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
