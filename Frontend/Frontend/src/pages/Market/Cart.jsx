import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MarketNavbar from '../../components/MarketNavbar';
import { Trash } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  
  const cartFeed = async() => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + `/getCartItem`, {
        withCredentials: true
      });
      
      console.log(response?.data?.data);
      setCart(response?.data?.data);
      
      const totalPrice = response?.data?.data.reduce((sum, item) => sum + item?.totalPrice, 0);
      setTotal(totalPrice);
    } catch (error) {
      if(error.response?.status === 401){
        return navigate("/login");
      }
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };
  


  
  useEffect(() => {
    cartFeed();
  }, []);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <MarketNavbar />
        <div className="flex justify-center items-center h-96">
          <div className="text-xl font-medium text-gray-600">Loading your cart...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100">
      <MarketNavbar />
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-gray-600 mb-4">Your cart is empty</h2>
            <button 
              onClick={() => navigate("/market")}
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden  flex-grow">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex-shrink-0 sm:mr-6 mb-4 sm:mb-0 flex justify-center">
                      <img 
                        src={item?.itemId?.cropPhoto} 
                        className="h-28 w-28 object-cover rounded-md"
                        alt={item?.itemId?.cropName || "Product"} 
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold text-gray-800">{item?.itemId?.cropName}</h2>
                      <p className="text-gray-600 mt-1">Seller: {item?.sellerId?.firstName} {item?.sellerId?.lastName}</p>
                      <div className="flex flex-wrap justify-between items-end mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Quantity: {item?.quantity}</p>
                          <p className="text-lg font-medium text-gray-900 mt-1">₹{item?.price}</p>
                        </div>
                        <button 
                          
                          className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                        >
                          <Trash size={18} className="mr-1" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow-md h-fit lg:w-80">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Price ({cart.length} {cart.length === 1 ? 'item' : 'items'})</p>
                    <p className="font-medium">₹{total}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Tax</p>
                    <p className="font-medium">₹0</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Delivery Charges</p>
                    <p className="text-green-600 font-medium">Free</p>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold">₹{total}</p>
                </div>
                <button 
                 
                  className="mt-6 w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-semibold"
                >
                  Place Order
                </button>
                <button 
                  onClick={() => navigate("/market")}
                  className="mt-3 w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors font-medium"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;