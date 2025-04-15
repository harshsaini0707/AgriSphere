import React from 'react';
import MarketNavbar from '../../components/MarketNavbar';
import { useNavigate } from 'react-router';

const Seller = () => {
  const navigate = useNavigate();
  return (
    <div >
      <MarketNavbar />
     <h2 className="text-2xl text-center font-bold my-10 ">Seller Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-3">
        <div  onClick={()=>navigate("/listCrop")}className="bg-amber-300 p-6 rounded-2xl text-center text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-102 duration-300">
          List New Crop
        </div>
        {/* <div className="bg-blue-300 p-6 rounded-2xl text-center text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-102 duration-300">
          Edit Listed Crop
        </div> */}
        <div
        onClick={()=>navigate("/sellerCrops")}
        
        className="bg-green-300 p-6 rounded-2xl text-center text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-102 duration-300">
          All Listed Crops
        </div>
        <div
        onClick={()=>navigate("/Neworders")}
        className="bg-red-300 p-6 rounded-2xl text-center text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-102 duration-300">
          New Orders
        </div>
        <div 
        onClick={()=>navigate("/editStatus")}
        className="bg-purple-300 p-6 rounded-2xl text-center text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-102 duration-300">
          Change Order Status
        </div>
        <div
        onClick={()=> navigate("/orderHistory")}
        className="bg-gray-300 p-6 rounded-2xl text-center text-lg font-semibold cursor-pointer hover:shadow-xl hover:scale-102 duration-300">
          All Placed Orders History
        </div>
      </div>
    </div>
  );
};

export default Seller;