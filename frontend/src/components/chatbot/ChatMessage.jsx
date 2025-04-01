import React from 'react'
import ChatbotIcon from './ChatbotIcon'

const ChatMessage = ({chat}) => {
  return (
   !chat.hideInChat && (<div>
      <div className={`flex ${chat.role==="model" ? ' items-start justify-start':'items-end justify-end'}`}>
            <div className={`${chat.role==="model" ? 'bg-gray-200 p-1 rounded-lg flex items-center':'bg-primary text-white'} ${chat.isError ? 'bg-gray-100 text-red-700':''} p-3 rounded-lg`}>
                {chat.role==="model" && <ChatbotIcon/>}
              <p>{chat.text}</p>
            </div>
          </div>
    </div>)
  )
}

export default ChatMessage
