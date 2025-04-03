import React from 'react'
import Dashboard from '../components/Dashboard'
import ChatComponent from '../components/ChatComponent' // Import the new component

const Chat = () => {
  return (
    <div className='flex min-h-screen bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#4ade80]'>
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