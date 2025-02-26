import React from 'react'
import { CirclePlus,TextSearch,UserRoundPlus ,LogOut,ShoppingBasket ,ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const SideBar = () => {

    const navigate = useNavigate();

    const Logout = async()=>{
        try {

            const response = await axios.post(import.meta.env.VITE_BASE_URL+"/admin/logout",{},{withCredentials:true})

          if(response){
            toast.success("LogOut Failed!",{
                position:"top-right",
                autoClose:3000
               })  
          }
            navigate("/login")
        } catch (error) {
           console.log(error); 
           toast.error("LogOut Failed!",{
            position:"top-right",
            autoClose:3000
           })
        }
    }
  return (
  
    <div className='min-w-1/7 flex flex-col rounded-r-xl  flex-auto min-h-screen bg-green-300'>
    <div className='flex justify-center mt-3'>
      <h1 className='font-bold text-2xl'>AGRISPHERE</h1>
    </div>
    <div className='flex flex-col gap-7 mx-2 items-start mt-20'>
      <div onClick={()=>navigate("/addCrop")} className='flex gap-2'>
        <CirclePlus size={30} />
        <h1 className='text-lg  sm:hidden hidden md:block lg:block xl:block'>Add Crop</h1>
      </div>
      <div onClick={()=>navigate("/feed")} className='flex gap-2'>
        <TextSearch size={30} />
        <h1 className='text-lg sm:hidden hidden md:block lg:block xl:block'>All Crops</h1>
      </div>
      <div className='flex gap-2'>
        <UserRoundPlus size={30} />
        <h1 className='text-lg sm:hidden hidden md:block lg:block xl:block'>Add Member</h1>
      </div>
      <div className='flex gap-2'>
        <ShoppingBasket size={30} />
        <h1 className='text-lg sm:hidden hidden md:block lg:block xl:block'>Buy and Sell</h1>
      </div>
      <div className='flex gap-2'>
        <ShoppingCart size={30} />
        <h1 className='text-lg sm:hidden hidden md:block lg:block xl:block'>Cart</h1>
      </div>
      <div onClick={Logout} className='flex gap-2'>
        <LogOut size={30} />
        <h1 className='text-lg sm:hidden hidden md:block lg:block xl:block'>Logout</h1>
      </div>
    </div>
  </div>
  )
}

export default SideBar