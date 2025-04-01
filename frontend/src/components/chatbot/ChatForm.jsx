import React, { useRef } from 'react'

const ChatForm = ({chatHistory,setChatHistory,generateBotResponse}) => {
    const inputRef=useRef()
    const handleFormSubmit=(e)=>{
       e.preventDefault()
       const userMessage=inputRef.current.value.trim()
       if(!userMessage) return;
       inputRef.current.value = ''
       
       //update chat history with user message
       setChatHistory(history=>[...history,{role:"user",text:userMessage}])

       //add ...thinking
       setTimeout(() => {
        setChatHistory(history=>[...history,{role:"model",text:'Thinking...'}])
        generateBotResponse([...chatHistory,{role:'user',text:` ${userMessage}`}])
       }, 600); 

      
    }
  return (
    <div>
       <form onSubmit={handleFormSubmit} className='flex items-center'>
          <input ref={inputRef} type='text' placeholder='Message...' className='flex-1 p-2 bg-white border rounded-l-lg' />
          <button type='submit' className='bg-blue-500 text-white p-2 m-2 rounded-r-lg'>Send</button>
        </form>
    </div>
  )
}

export default ChatForm
