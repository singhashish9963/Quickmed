import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex  sm:grid-cols-[2fr,1fr,1fr] gap-14 my-10 mt-40 text-sm'>
        {/* left section */}
        <div >
            <img className='mb-5 w-40' src={assets.logo} alt="" />
            <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ducimus aliquid officiis inventore magni dignissimos omnis? Quia reprehenderit hic perspiciatis voluptate vero, nemo possimus voluptatum?</p>
        </div>
        {/* centre section */}
        <div>
            <p className='text-xl font-medium mb-5'>COMPANY </p>
            <ul className='flex flex-col gap-2'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        {/* right section */}
        <div>
            <p className='text-[18px] font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-2'>
                <li>+91 4585 4545 445</li>
                <li>mygmail@gmail.com</li>
            </ul>
        </div>
      </div>
      {/* {copyright } */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025@ mYapp - All Right Reserved</p>
      </div>
    </div>
  )
}

export default Footer
