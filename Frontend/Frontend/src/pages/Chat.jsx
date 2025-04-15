import React from 'react'
import Dashboard from '../components/Dashboard'
import ChatComponent from '../components/ChatComponent' // Import the new component

const Chat = () => {
  return (
    <div className='flex min-h-screen bg-[#2c2c2c]'>
        <Dashboard/>

        <div className='flex-1 flex items-center justify-center p-4'>
          <div className='w-full max-w-4xl h-[85vh]'>
            <ChatComponent />
          </div>
        </div>
    </div>
  )
}

export default Chat