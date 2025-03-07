import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import useValidation from '../hooks/useValidation';
import { MdSell } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { FaList } from "react-icons/fa";
import { SiGooglestreetview } from "react-icons/si";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router';
import { MdHome } from "react-icons/md";

const MarketNavbar = () => {
  const user = useSelector((store) => store.user || "");
  useValidation();
  const navigate = useNavigate();
  
  const [click, setClick] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-green-600 shadow-lg">
      <div className="container mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center gap-14">
          <h1 className="text-3xl font-extrabold text-white tracking-wider">
            AgriMarket
          </h1>
          <h1
            className="text-white hover:text-green-300  flex  items-center gap-2 transition duration-300 font-semibold text-lg cursor-pointer"
          > <MdSell size={27} />
            Seller
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex pl-130 space-x-8">
          <h1
            onClick={()=>navigate("/market")}
            className="text-white text-lg  flex items-center gap-2 hover:text-green-300 transition duration-300 font-medium cursor-pointer"
          >
            <FaBoxOpen size={27}/>
            Marketplace
          </h1>
          <h1 onClick={()=>navigate("/cart")}
            className="text-white text-lg hover:text-green-300 transition duration-300 font-medium flex items-center cursor-pointer"
          >
            <ShoppingCart className="mr-2" size={27} />
            Cart
          </h1>
        </div>

        {/* User Dropdown */}
        <div className="relative">
          <img 
            onClick={() => setClick(!click)}
            src={user.profilePhoto}
            alt="User Profile"
            className="rounded-full w-12 h-12 border-2 border-white hover:border-green-300 cursor-pointer transition duration-300"
          />
           
          {click && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl overflow-hidden">
              <h1 
                className="flex items-center px-4 py-2 font-semibold text-gray-800 hover:bg-green-100 transition duration-300 cursor-pointer"
              >
               <SiGooglestreetview size={16} className='mr-2'/>  Order Status
              </h1>
              <h1
                className=" px-4 py-2 font-semibold text-gray-800 hover:bg-green-100 transition flex  items-center duration-300 cursor-pointer"
              >
             <FaList size={16} className='mr-2'/>   All Orders
              </h1>
              <h1
                onClick={()=>navigate("/userHome")}
                className="flex items-center px-3 font-semibold py-2 hover:bg-green-200 transition duration-300 cursor-pointer"
              >
              <MdHome size={25} className='mr-1' />  AgriSphere
              </h1>
              <h1
                className="flex items-center px-4 font-semibold py-2 text-red-500 hover:bg-red-100 transition duration-300 cursor-pointer"
              >
              <LuLogOut size={18} className='mr-2'/>  Logout
              </h1>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MarketNavbar;
