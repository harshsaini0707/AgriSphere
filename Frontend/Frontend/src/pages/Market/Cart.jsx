import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import MarketNavbar from '../../components/MarketNavbar';
import { Trash } from 'lucide-react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const[address , setAddress] = useState("");
  const[maxQty , setMaxqty] = useState(0);
  const [buying, setBuying] = useState(false); 
  
  
  const navigate = useNavigate();

  const handleBuy = async()=>{
    setBuying(true);
    try {
      const order = await axios.post(import.meta.env.VITE_BASE_URL+"/paymentCreate",{
        total
      } , {withCredentials:true})
      console.log(order);
      

      //open razorpay dialog box
      const {amount , keyId , notes , currency , orderId} = order?.data;

      const options = {
        key: keyId, // Replace with your Razorpay key_id
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: currency,
        name: "AgriSphere",
        description: 'Make Farming Easy!!',
        order_id: orderId, // This is the order_id created in the backend
        prefill: {
          name: notes?.firstName + " "+notes?.lastName,
          email: notes?.email,
          
        },
        theme: {
          color: '#F37254'
        },
        handler: function(response) {
          // This function runs after successful payment
          console.log("Payment successful:", response);
          // Call your API to update payment status
          updatePaymentStatus(orderId, response.razorpay_payment_id);
        }
      };


      const rzp = new window.Razorpay(options);
      rzp.open();

      cartFeed();

    } catch (error) {
      if(error?.order?.status === 401) return navigate("/login");

      console.log(error);
      
    }finally{
      setLoading(false);
    }
  }
  const updatePaymentStatus = async(orderId, paymentId) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + "/payment/update-status",
        { orderId, paymentId },
        { withCredentials: true }
      );
      console.log("Payment status updated:", response.data);
      cartFeed();
      // Redirect to order confirmation or orders page
    //  navigate("/orders");
    } catch (error) {
      console.error("Error updating payment:", error);
    }
  };

  const cartFeed = async() => {
    setLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + `/getCartItem`, {
        withCredentials: true
      });
      
      //console.log(response?.data?.data);
      setCart(response?.data?.data);

      const filteredItems = allItems.filter(item => item.buyStatus === false);
      const totalPrice = filteredItems.reduce((sum, item) => sum + item?.totalPrice, 0);
      setTotal(totalPrice);

      setMaxqty(response?.data?.data?.itemId?.quantity )
    } catch (error) {
      if(error.response?.status === 401){
        return navigate("/login");
      }
      console.log(error?.response);
    } finally {
      setLoading(false);
    }
  };

  const delelteItem = async (itemId)=>{
    try {
      const response = await axios.delete(import.meta.env.VITE_BASE_URL+`/deleteCartItem/${itemId}` , {
        withCredentials:true
      })
      console.log(response);
      cartFeed();
      
    } catch (error) {
      if(error?.response?.status === 401){
        return navigate("/login")
      }
    }
  }
  
  const EditItem = async(ItemId)=>{
    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL+`/buyItem/${ItemId}`,{
                      quantity:quantity,
                      address : address
                  },{withCredentials:true})

      
      
    } catch (error) {
      if(error?.response?.status === 401){
        return navigate("/login")
      }
      console.log(error);
      
    }
  }

const cartfilter = cart.filter((item)=>item.buyStatus === false)
  
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
        
        {cartfilter.length === 0 ? (
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
                {cartfilter?.map((item) => (
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
                         
                          <p className="text-sm text-gray-600">Quantity: {item?.quantity} </p>
                          <p className="text-lg font-medium text-gray-900 mt-1">₹{item?.price}</p>
                        </div>
                        <button 
                          onClick={()=>delelteItem(item._id)}
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
         
            <div className="bg-white rounded-lg shadow-md h-fit lg:w-80">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Price ({cartfilter.length} {cart.length === 1 ? 'item' : 'items'})</p>
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
                <div >
                <textarea  value={address} onChange={(e)=>setAddress(e.target.value)} placeholder='Please Enter Your Address'  className='p-3 w-full outline-1 outline-green-400 rounded-md min-h-10' required>
                </textarea>
                </div>
                <div className="flex justify-between pt-4">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold">₹{total}</p>
                </div>

                <button 
  onClick={handleBuy}
  disabled={buying || !address} 
  className={`mt-6 w-full bg-green-600 text-white py-3 px-4 rounded-md transition-colors font-semibold
    ${buying ? "opacity-60 cursor-not-allowed" : "hover:bg-green-700"}`}
>
  {buying ? (
    <div className="flex items-center justify-center gap-2">
      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      Processing...
    </div>
  ) : (
    "Place Order"
  )}
</button>

                <button 
                  onClick={() => navigate("/marketplace")}
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