import React, { useEffect, useState } from 'react';
import MarketNavbar from '../../components/MarketNavbar';
import axios from 'axios';
import { IoCart } from 'react-icons/io5';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarketDashBoard = () => {
  const [feed, setFeed] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const buyerFeed = async () => {
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
    });
  };

  const filteredFeed = search
    ? feed.filter((item) => item.cropName.toLowerCase().includes(search.toLowerCase()))
    : feed;

  return (
    <div>
      <MarketNavbar />
      <div className='bg-gray-100 min-h-screen scroll-smooth'>
        <ToastContainer />

        <div className='flex gap-75 items-center justify-center pt-8'>
          <select className='w-40 outline-2 h-8 focus:outline-3 font-mono'>
            <option value='' selected hidden>Category</option>
            <option value='All'>All</option>
            <option value='Data'>DATA</option>
            <option value='Oil'>Oil</option>
            <option value='TO'>To</option>
            <option value='Many'>Many</option>
          </select>

          <input type='text' value={search} onChange={(e) => setSearch(e.target.value)} className='w-3xl outline-2 px-2 h-8' placeholder='Search here..' />
        </div>

        {/* Product */}
        <div className='flex flex-wrap gap-6 justify-center mt-14'>
          {
            filteredFeed.length ===0 && <div className='flex mt-18'><h1 className='font-bold text-3xl  '>Item Not Found !!</h1></div>
          }
          {filteredFeed &&
            filteredFeed.map((data) => (
              <div
                key={data._id}
                onClick={() => navigate(`/aboutProduct/${data?._id}`)}
                className='group flex flex-col rounded-sm border-1 shadow-md hover:scale-103 hover:shadow-xl transition-all duration-300 overflow-hidden max-w-xs bg-white'
              >
                <div className='relative overflow-hidden transition-transform duration-300'>
                  <img src={data?.cropPhoto} alt={data?.cropName} className='w-full h-48 object-cover' />
                </div>

                <div className='px-2 py-3 flex justify-between'>
                  <h2 className='text-xl font-bold text-gray-800 truncate'>{data?.cropName}</h2>
                  <span className='text-lg font-bold text-emerald-600'>₹{data?.price}</span>

                  <div className='hidden group-hover:block'>
                    <button
                      onClick={(e) => handleAddToCart(e, data)}
                      className='bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-sm transition-colors duration-300 flex items-center justify-center'
                    >
                      <IoCart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDashBoard;
