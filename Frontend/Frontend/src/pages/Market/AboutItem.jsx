import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import MarketNavbar from '../../components/MarketNavbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AboutItem = () => {

    const navigate = useNavigate();
    const req = useParams();
    const ItemId = req.ItemId;
    const [about , setAbout ]= useState("");
    const [quantity , setQuantity] =  useState(1);
   

    const addToCart = async()=>{
        try {
            const response = await axios.post(import.meta.env.VITE_BASE_URL+`/addToCart/${ItemId}`,{
                quantity:quantity
            },{withCredentials:true})

            console.log(response?.data?.data);

            toast.success(`Added to Cart!`,{
                position:"top-right",
                autoClose:3000
            })
            
            
        } catch (error) {
            if(error.response?.status === 401){
                return navigate("/login") 
            }
            console.log(error.response?.data?.data);
            toast.error(error.response?.data?.data,{
                position:"top-right",
                autoClose:3000
            })
            
        }
    }
    const aboutItem = async()=>{
        try {
            if(about) return;
            const response = await axios.get(import.meta.env.VITE_BASE_URL+`/aboutProduct/${ItemId}`,{
                withCredentials:true
            })
            
            console.log(response?.data?.data);
            setAbout(response?.data?.data);
            
        } catch (error) {
            if(error.response?.status === 401){
                return navigate("/login")
            }
            console.log(error);
        }
    }

    useEffect(()=>{
        aboutItem();
    },[])
  return (
    <div className="bg-amber-50 min-h-screen">
  <MarketNavbar />

  <div className="container mx-auto px-4 py-8">
        <ToastContainer/>
    {about && (
      <div className="bg-white rounded-mg shadow-lg overflow-hidden max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row">
        
          <div className="md:w-1/2 relative">
            <div className="bg-amber-50 h-full flex items-center justify-center p-4">
              <img 
                src={about?.cropPhoto} 
                alt={about?.cropName}
                className="object-contain  w-full rounded-sm"
              />
            </div>
            
            {/* Availability Badge */}
            {about?.availability ? <div className="absolute top-7 right-4 bg-green-500 text-white px-4 py-1 rounded-md text-sm font-medium">
                In Stock
              </div> : (
              <div className="absolute top-7 right-4 bg-red-500 text-white px-4 py-1 rounded-sm text-sm font-medium">
                Out of Stock
              </div>
            )}
          </div>
          
          {/* Product Details Section */}
          <div className="md:w-1/2 p-8 flex flex-col">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{about?.cropName}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
                  {about?.cropType.join(", ")}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Season: {about?.season.join(", ")}
                </span>
              </div>
              <div className="text-2xl font-bold text-amber-600 mb-2 pt-2">₹{about?.price}</div>
            </div>
            
            <div className="mb-4 flex-grow">
              <h2 className="text-lg font-semibold mb-2 text-gray-700">About this product</h2>
              <p className="text-gray-600 leading-relaxed">{about?.about}</p>
            </div>

            <div className='mb-4 flex-grow'>
           { about?.quantity >0 ? <h1 className='font-semibold'>   Quantity : {about?.quantity}</h1> : <h1 className='font-bold text-green-700'> Available Soon..</h1>}
            </div>

            <div className='mb-8 flex-grow'>
           { about?.quantity >0 ? <h1 className='font-semibold '>Select Quantity : <input 
           className='focus:outline-green-500  rounded-lg px-2 text-center py-1'
           value={quantity}
           onChange={(e)=>setQuantity(e.target.value)}
           type="number" min={1} max={about?.quantity} /> </h1> : ""}
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button

              onClick={addToCart}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                </svg>
                Add to Cart
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Buy Now
              </button>
            </div>
            
            {/* Additional Information */}
            <div className="mt-2 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1M3 4h5.5m0 0v1m0-1H9m0 0v3m0-3h2.5m0 0v1" />
                  </svg>
                  <span className="text-sm text-gray-600">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-600">Quality Guaranteed</span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  )
}

export default AboutItem