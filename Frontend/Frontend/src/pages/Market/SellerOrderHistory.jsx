import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { StepBack } from "lucide-react";

const SellerOrderHistory = () => {
  const navigate = useNavigate();
  const [orderData , setOrder] =useState([]);
  const[loading , setLoading] = useState(true);

  const AllOrders = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/allOrders`,{
        withCredentials:true
      })

      console.log(response?.data?.data);
      setOrder(response?.data?.data || [])
      
    } catch (error) {
      if(error?.response?.status === 401){
        return navigate("/login")
      }
    }finally{
      setLoading(false)
    }
  }
  useEffect(()=>{
AllOrders();
  },[])
  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className="bg-green-600 w-full sticky flex h-16 items-center text-white px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-green-700 transition p-2 rounded-md"
        >
          <StepBack size={20} />
          <span>Back</span>
        </button>
        <h1 className="md:text-xl sm:text-lg font-semibold ml-4">All Orders</h1>
      </nav>
      {
        loading? (
          <div className="flex flex-col items-center justify-center h-27 my-50">
          <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full  animate-spin"></div>
          <h1 className='font-semibold mt-4 text-xl animate-pulse '>Getting Your Data....</h1>
        </div>
        ):(
          <div>
           {
            orderData.length === 0? (
              <p className="font-semibold mt-50 text-center text-2xl animate-pulse">No Orders Currently...</p>
            ):(
              <div className="grid grid-cols-1 ">
              {orderData.map((ele) => (
                <div
                  key={ele?._id}
                  className="flex items-center bg-white p-4  gap-20 shadow-lg pl-100 rounded-lg border border-gray-200"
                >
                
                  <img
                    src={ele?.itemId?.cropPhoto}
                    alt={ele?.itemId?.cropPhoto}
                    className="h-36 w-36 rounded-lg object-cover shadow-md"
                  />
  
                  {/* Crop Details */}
                  <div className="ml-6 space-y-2">
                    <h1 className="text-lg font-semibold text-gray-800">{ele?.itemId?.cropName}</h1>
                    <h1 className={`text-sm font-medium `}>
                      {ele?.address}
                    </h1>
                    <h1>Buyer : {ele?.buyerId?.firstName} {ele?.buyerId?.lastName}</h1>
                    <h1>Contact :{ele?.buyerId?.email}</h1>
                    <h1 className="text-sm text-gray-600">Ordered On: {new Date(ele?.updatedAt).toLocaleDateString()}</h1>
                    <h1 className="text-md font-semibold text-gray-700">Price: ₹{ele?.totalPrice}</h1>
                    <h1 className="text-md text-gray-700">Quantity: {ele?.quantity}</h1>
                  </div>
                </div>
              ))}
            </div>
            )
           }
            </div>
        )
      }
    </div>
  )
}

export default SellerOrderHistory