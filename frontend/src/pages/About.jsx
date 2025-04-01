import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:2/4 text-sm text-gray-600'>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, esse tenetur consequatur sapiente earum, itaque excepturi ab qui explicabo molestias pariatur ipsa id. Adipisci possimus ducimus quae corrupti quisquam et expedita saepe nesciunt ratione eligendi!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit deleniti, error quod illum ipsum incidunt.</p>
            <b className='text-gray-800'>Our Vision</b>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora repellendus culpa at expedita. Autem exercitationem dolorum alias sint laboriosam tempore explicabo neque hic libero eius possimus, ipsam corrupti accusamus molestias.</p>
        </div>
      </div>
      <div className='text-xl my-4'>
        <p className='text-center font-bold text-xl'>Why Choose Us</p>
      </div>
      <div className='flex flex-col  md:flex-row gap-5 mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>Efficiency:</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt facilis vitae voluptates assumenda odit voluptatem nobis unde quas aperiam? Nesciunt.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
      <b>Convinience:</b>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum, suscipit. Inventore neque veniam temporibus? Assumenda omnis reprehenderit corrupti quaerat quasi.</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
      <b>Personalization:</b>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae ea iusto reprehenderit odio nihil et nemo doloribus suscipit? Beatae, voluptas?</p>
      </div>
      </div>
    </div>
  )
}

export default About
