import React, { useEffect, useState } from "react";
import { StepBack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SellerListedCrop = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const[loading , setLoading] = useState(true);

  useEffect(() => {
    const fetchListedItems = async () => {
      try {
        
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getItem`,
          { withCredentials: true }
        );
        setItem(response?.data?.data || []);
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate("/login");
        }
        console.error("Error fetching items:", error);
      }finally{
        setLoading(false)
      }
    };

    fetchListedItems();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      
      <nav className="bg-green-600 w-full sticky flex h-16 items-center text-white px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover:bg-green-700 transition p-2 rounded-md"
        >
          <StepBack size={20} />
          <span>Back</span>
        </button>
        <h1 className="md:text-xl sm:text-lg font-semibold ml-4">Listed Items</h1>
      </nav>

   
    { loading ?( 
     <div className="flex items-center justify-center h-20 my-50">
     <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full  animate-spin"></div>
   </div>
   
    ) : ( <div className="max-w-5xl mx-auto p-6">
        {item.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No items listed.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {item.map((ele) => (
              <div
                key={ele?._id}
                className="flex items-center bg-white p-4 shadow-lg rounded-lg border border-gray-200"
              >
              
                <img
                  src={ele?.cropPhoto}
                  alt={ele?.cropName}
                  className="h-36 w-36 rounded-lg object-cover shadow-md"
                />

                {/* Crop Details */}
                <div className="ml-6 space-y-2">
                  <h1 className="text-lg font-semibold text-gray-800">{ele?.cropName}</h1>
                  <h1 className={`text-sm font-medium ${ele?.availability ? "text-green-600" : "text-red-500"}`}>
                    {ele?.availability ? "Available" : "Out of Stock"}
                  </h1>
                  <h1 className="text-sm text-gray-600">Listed On: {new Date(ele?.createdAt).toLocaleDateString()}</h1>
                  <h1 className="text-md font-semibold text-gray-700">Price: ₹{ele?.price}</h1>
                  <h1 className="text-md text-gray-700">Quantity: {ele?.quantity}</h1>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>)
}
    </div>
  );
};

export default SellerListedCrop;
