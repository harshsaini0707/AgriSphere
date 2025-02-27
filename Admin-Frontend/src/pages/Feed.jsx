import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye } from 'lucide-react';
import SideBar from '../components/SideBar';

const Feed = () => {

    const navigate = useNavigate();
    const[feedData,setFeedData] = useState([]);
    const[STATE,setState] = useState("");
    const[soil,setSoil] = useState("");

    const Feed = async()=>{
        try {
            
            const response = await axios.get(import.meta.env.VITE_BASE_URL+"/crop/feed",{withCredentials:true});

            console.log(response?.data?.data);
            setFeedData(response?.data?.data)
            
            
        } catch (error) {
            if(error.response?.status  === 401){
                navigate("/login")
            }else{
                console.log(error.message);
                
            }
        }
    }

    useEffect(()=>{
        Feed();
    },[])
    console.log(feedData);

    const filterCrop = feedData.filter((ele)=>{
        const state= STATE.trim().toLowerCase();
        const Soill = soil.trim().toLowerCase();

        const cropSoilTypes = ele.soilType.map((s) => s.trim().toLowerCase());
        const cropStateType = ele.state.map((s)=>s.trim().toLowerCase());

        const soilData  =Soill? cropSoilTypes.includes(Soill) : true;
        const stateType = state ? cropStateType.includes(state) : true;
        
        return soilData && stateType;

    })
  return (
    <div className='min-h-screen w-full bg-amber-500 flex '>
        {/**SideBar */}
  <SideBar/>
        {/**Feed */}
       
        <div  className="flex-auto space-y-4 bg-amber-500   justify-center items-center py-10">
       
       <div className=''>
       <form className="flex gap-4 cursor-pointer justify-center mb-8 ">
            <select
              value={STATE}
              onChange={(e)=>setState(e.target.value)}
              className=" backdrop-blur-sm bg-amber-300 font-mono rounded-md p-2 focus:ring-0 ring-2 ring-green-500 "
            >
              <option className="bg-gray-500 font-semibold text-white scroll-smooth " value="">All State / Union Territory</option>
              {[
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
              ].map((state) => (
                <option  className=" bg-gray-500 font-semibold text-white font-mono scroll-smooth " key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              value={soil}
              onChange={(e)=>setSoil(e.target.value)}
              className=" backdrop-blur-sm bg-amber-300 font-mono rounded-md p-2 focus:ring-0 ring-2 ring-green-500 "
            >
              <option value="" className="bg-gray-500 font-semibold text-white ">Select Soil Type</option>
              {["Alluvial", "Black", "Red" ,"Yellow", "Laterite", "Arid", "Saline", "Forest"].map(
                (soil) => (
                  <option className=" bg-gray-500 font-semibold text-white scroll-smooth" key={soil} value={soil}>
                    {soil}
                  </option>
                )
              )}
            </select>
          </form>
       </div>
           
        {filterCrop && filterCrop?.map((data) => (
   <div key={data._id} className="bg-white flex flex-col hover:scale-103 transform transition-all duration-300 delay-100 shadow-lg rounded-2xl p-6 w-fit mx-10 ">
      <div className="flex  space-x-4 ">
        <img
          src={data?.cropPhoto}
          alt={data?.cropName}
          className="w-32 h-32 object-cover rounded-full border-4 border-amber-400"
        />
        <div className=' '>
          <h1 className="text-2xl font-bold text-amber-800">{data?.cropName}</h1>
          <p className="text-md pt-1 text-gray-700">State: {data?.state.join(",")}</p>
          <p className="text-md text-gray-600 mt-2">{data?.about}</p>
          
        </div>

            <div className='flex justify-center items-center'>
  <button  onClick={()=>navigate(`/Edit/${data._id}`)} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-4 px-4 rounded-lg transition-all hover:scale-103 duration-300 flex items-center gap-2">
    <Eye /> Edit
  </button>
</div>

        </div>  
  </div>
))}

</div>
       
     
    </div>
  )
}

export default Feed