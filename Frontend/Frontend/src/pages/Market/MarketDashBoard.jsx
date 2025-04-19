import React, { useEffect, useState } from 'react';
import MarketNavbar from '../../components/MarketNavbar';
import axios from 'axios';
import { IoCart, IoSearch } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarketDashBoard = () => {
  const [feed, setFeed] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const buyerFeed = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL + '/itemFeed', {
        withCredentials: true,
      });
      console.log(response?.data?.data);
      setFeed(response?.data?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        return navigate('/login');
      }
      toast.error('Failed to load products.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    buyerFeed();
  }, []);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    toast.success(`${product.cropName} added to cart!`, {
      position: 'top-right',
      autoClose: 2000,
      className: 'bg-emerald-500 text-white shadow-lg rounded-md',
    });
    
    console.log('Added to cart:', product);
  };

  const filteredFeed = search
    ? feed.filter((item) =>
        item.cropName.toLowerCase().includes(search.toLowerCase())
      )
    : feed;

  return (
    <div className="bg-gray-50 min-h-screen">
      <MarketNavbar />
      <ToastContainer />


      <div className="bg-gradient-to-r  py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Fresh Farm Market</h1>
          <div className="relative max-w-xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-lg border-0 focus:ring-2 focus:ring-white text-gray-700 shadow-lg outline-1"
              placeholder="Search for fresh produce..."
            />
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Available Products</h2>
          <p className="text-gray-600">{filteredFeed.length} products</p>
        </div>


        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-emerald-500"></div>
          </div>
        ) : filteredFeed.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-10 text-center">
            <h1 className="font-bold text-2xl text-gray-600">No items found matching your search.</h1>
            <p className="text-gray-500 mt-2">Try a different search term or browse all products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFeed.map((data) => (
              <div
                key={data._id}
                onClick={() => navigate(`/aboutProduct/${data?._id}`)}
                className="group flex flex-col rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white cursor-pointer transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={data?.cropPhoto}
                    alt={data?.cropName}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
           
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <h2 className="text-xl font-semibold text-gray-800 truncate mb-1">{data?.cropName}</h2>
                    <p className="text-gray-600 text-sm line-clamp-2">{data?.about?.substring(0, 70)}...</p>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-lg font-bold text-emerald-600">₹{data?.price}</span>
                    <button
                      onClick={(e) => handleAddToCart(e, data)}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-colors duration-300 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md"
                      aria-label="Add to cart"
                    >
                      <IoCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
     
    </div>
  );
};

export default MarketDashBoard;
