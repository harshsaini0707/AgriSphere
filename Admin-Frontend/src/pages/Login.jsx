import React from 'react'


const Login = () => {
  return (
    <div className='min-h-screen w-full bg-gray-500 flex justify-center items-center '>
      <div className='flex  min-h-fit  rounded-2xl bg-white'>
 <div className='px-3 flex flex-col'>
 <h1 className='mt-5 font-bold text-3xl text-center'>Login</h1> 
 <p className="pt-2 text-[13px] text-center">Enter Details!!</p>

 <div className='flex flex-col mt-8 m-12'>
 <h1 className='text-lg '>Email</h1>
 <input type="text"  className='focus:outline-lime-300 my-2' placeholder='Enter Email' required />
 <h1 className='text-lg'>Password</h1>
 <input type="text" className='focus:outline-amber-500 my-2 ' placeholder='Enter Password' required />

 <button type='submit' className='bg-amber-300 py-1 rounded-lg my-3'>Login</button>
 </div>
 </div>
      </div>

    </div>
  )
}

export default Login