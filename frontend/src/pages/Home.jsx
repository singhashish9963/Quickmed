import React, { useState } from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import ChatbotIcon from '../components/chatbot/ChatbotIcon'

const Home = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div>
      <Header />
      <SpecialityMenu />
      <div
        className='fixed bottom-4 right-4 m-7 flex items-center'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <div className='mr-2 p-2 bg-primary text-white rounded-lg'>
            How can I help you?
          </div>
        )}
        <ChatbotIcon />
      </div>
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home