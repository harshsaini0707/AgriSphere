import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import useValidation from '../hooks/useValidation';
import { MdSell } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from 'react-router';
import { StepBack } from "lucide-react";
import axios from 'axios';

const MarketNavbar = () => {
  const user = useSelector((store) => store.user || "");
  useValidation();
  const navigate = useNavigate();

  const [click, setClick] = useState(false);
  const [isBuyer, setIsBuyer] = useState(true); // Renamed for clarity

  const logout = async () => {
    try {
      await axios.post(import.meta.env.VITE_BASE_URL + "/logout", {}, {
        withCredentials: true
      });
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-emerald-600 shadow-md transition-colors duration-300">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center text-white hover:text-emerald-200 focus:outline-none transition duration-200"
          >
            <StepBack size={24} />
            <span className="ml-2 font-semibold text-lg hidden sm:inline"></span>
         
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wider">
            AgriMarket
          </h1>
          </button>
        </div>

        {/* Middle Section (Hidden on smaller screens) */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <button
            onClick={() => {
              setIsBuyer(true);
              navigate("/marketplace");
            }}
            className={`flex items-center text-white hover:text-emerald-200 focus:outline-none transition duration-200 font-medium ${isBuyer ? 'font-semibold' : ''}`}
          >
            <FaBoxOpen size={20} className="mr-2" />
            Marketplace
          </button>
          <button
            onClick={() => {
              setIsBuyer(false);
              navigate("/seller");
            }}
            className={`flex items-center text-white hover:text-emerald-200 focus:outline-none transition duration-200 font-medium ${!isBuyer ? 'font-semibold' : ''}`}
          >
            <MdSell size={20} className="mr-2" />
            Seller
          </button>
          <button
            onClick={() => {
              setIsBuyer(true);
              navigate("/cart");
            }}
            className="flex items-center text-white hover:text-emerald-200 focus:outline-none transition duration-200 font-medium"
          >
            <ShoppingCart size={20} className="mr-2" />
            Cart
          </button>
        </div>

        {/* Right Section (Profile Dropdown) */}
        <div className="relative">
          <button
            onClick={() => setClick(!click)}
            className="focus:outline-none"
          >
            <img
              src={user.profilePhoto}
              alt="User Profile"
              className="rounded-full w-10 h-10 border-2 border-white hover:border-emerald-200 transition duration-200 cursor-pointer"
            />
          </button>

          {click && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl overflow-hidden">
              <h3 className="px-4 py-2 font-semibold text-gray-700 text-sm">
                {user.name}
              </h3>
              <hr className="border-gray-200" />
              <button
                onClick={() => navigate("/userHome")}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-emerald-100 focus:outline-none transition duration-200 w-full text-left"
              >
                <MdHome size={18} className="mr-2" />
                AgriSphere
              </button>
              <button
                onClick={logout}
                className="flex items-center px-4 py-2 text-red-500 hover:bg-red-100 focus:outline-none transition duration-200 w-full text-left"
              >
                <LuLogOut size={18} className="mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation (Visible on smaller screens) */}
      <div className="md:hidden bg-emerald-700 py-2">
        <div className="container mx-auto flex justify-around px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => {
              setIsBuyer(true);
              navigate("/market");
            }}
            className={`flex flex-col items-center text-white hover:text-emerald-200 focus:outline-none transition duration-200 font-medium text-sm ${isBuyer ? 'font-semibold' : ''}`}
          >
            <FaBoxOpen size={20} />
            <span className="mt-1">Market</span>
          </button>
          <button
            onClick={() => {
              setIsBuyer(false);
              navigate("/seller");
            }}
            className={`flex flex-col items-center text-white hover:text-emerald-200 focus:outline-none transition duration-200 font-medium text-sm ${!isBuyer ? 'font-semibold' : ''}`}
          >
            <MdSell size={20} />
            <span className="mt-1">Sell</span>
          </button>
          <button
            onClick={() => {
              setIsBuyer(true);
              navigate("/cart");
            }}
            className="flex flex-col items-center text-white hover:text-emerald-200 focus:outline-none transition duration-200 font-medium text-sm"
          >
            <ShoppingCart size={20} />
            <span className="mt-1">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default MarketNavbar;