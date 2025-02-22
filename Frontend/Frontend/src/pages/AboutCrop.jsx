import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import Dashboard from "../components/Dashboard";
import { 
  CheckCircle,
  Droplets, 
  Thermometer, 
  Leaf, 
  CloudRain, 
  IndianRupee,
  Timer,
  Calendar,
  Sprout,
  MapPin,
  Gauge,
  FlaskConical,
  Bean
} from "lucide-react";
import useValidation from "../hooks/useValidation";

const AboutCrop = () => {
  useValidation();
  const [about, setAbout] = useState({});
  const[toast,setToast] = useState(false);
  const [area,setArea] = useState(false);
  const [inputArea, setInputArea] = useState(1)
  const req = useParams();

  const aboutCrop = async () => {
    try {
      const cropId = req.cropId;
      if (!cropId) return;
      const response = await axios.get(import.meta.env.VITE_BASE_URL+`/aboutCrop/${cropId}`, {
        withCredentials: true,
      });
      console.log(response?.data?.data);
      
      setAbout(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const plantCrop = async (cropId)=>{
    try {
     if(!cropId) return;
     const response = await axios.post(import.meta.env.VITE_BASE_URL+`/plantCrop/${cropId}`,{
       cropId, area:inputArea
      },{withCredentials:true})
     
      
    } catch (error) {
     console.log(error.message);
     
    }
 
   }
   const popUp =()=>{
    setTimeout(()=>{
      setToast(false)
    },3000)
   }

  useEffect(() => {
    aboutCrop();
  }, [req]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#4ade80]">
      <Dashboard />
      <div className="p-6 ml-40 w-full flex justify-center">
        <div className="w-full max-w-4xl">
        {
     toast && (
      <div className="fixed top-5 right-5 flex font-bold items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out animate-fade z-10">
        <CheckCircle className="mr-2" size={20} />
        <span>Crop Added Successfully!</span>
      </div>
    )}
    {area && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                <h2 className="text-lg font-semibold mb-4 text-center">Enter Planting Area</h2>
                <input
                  type="number"
                  placeholder="Enter Area (in Bigha)"
                  min="0"
                  value={inputArea}
                  onChange={(e) => setInputArea(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
               <h1 className="mt-2 font-semibold">Seed Required :{about?.seedRequired * inputArea}kg in {inputArea} Bigha </h1>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setArea(false)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>{ plantCrop(about._id) 
              
               popUp()
               setToast(true)
               setInputArea("")
               setArea(false)
              }
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white shadow-2xl rounded-3xl overflow-hidden backdrop-blur-sm border border-green-100">
         
            {/* Header Section */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/10 opacity-20"></div>
              <h1 className="text-white text-center font-bold mb-2 text-3xl relative z-10">
                {about.cropName}
              </h1>
              <p className="text-lg  text-white  text-center relative z-10">
                {about?.about}
              </p>
              
            </div>
            

            {/* Content Section */}
            <div className="p-8">
              {/* Image and Basic Info */}
              <div className="flex flex-col items-center mb-8">
                {about.cropPhoto && (
                  <div className="relative group">
                    <img
                      src={about.cropPhoto}
                      alt={about.cropName}
                      className="w-64 h-64 object-cover rounded-2xl shadow-lg transform transition-all duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
              </div>
                
              {/* Grid Information */}
              <div className="grid grid-cols-2 gap-6">
                {/* Market Price */}
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 p-4 rounded-xl border border-green-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-lg">
                      <IndianRupee className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">Market Price</p>
                      <p className="text-lg font-bold text-green-800">{about?.market?.currentPrice}/kg</p>
                    </div>
                  </div>
                </div>

                {/* Duration */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-xl border border-blue-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-lg">
                      <Timer className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">Duration</p>
                      <p className="text-lg font-bold text-blue-800">{about.duration} days</p>
                    </div>
                  </div>
                </div>

                {/* Water Requirement */}
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 p-4 rounded-xl border border-cyan-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-500 p-2 rounded-lg">
                      <Droplets className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-cyan-700 font-medium">Water Requirement</p>
                      <p className="text-lg font-bold text-cyan-800">{about?.waterRequirement?.join("-")}L</p>
                    </div>
                  </div>
                </div>

                {/* Temperature */}
                <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 rounded-xl border border-red-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 p-2 rounded-lg">
                      <Thermometer className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-red-700 font-medium">Temperature</p>
                      <p className="text-lg font-bold text-red-800">{about?.optimalConditions?.temperature}</p>
                    </div>
                  </div>
                </div>

                {/* Humidity */}
                <div className="bg-gradient-to-br from-sky-50 to-sky-100/50 p-4 rounded-xl border border-sky-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-500 p-2 rounded-lg">
                      <Gauge className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-sky-700 font-medium">Humidity</p>
                      <p className="text-lg font-bold text-sky-800">{about?.optimalConditions?.humidity}</p>
                    </div>
                  </div>
                </div>

                {/* Nutrition/Fertilizer */}
                <div className="bg-gradient-to-br from-violet-50 to-violet-100/50 p-4 rounded-xl border border-violet-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-500 p-2 rounded-lg">
                      <FlaskConical className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-violet-700 font-medium">Nutrition</p>
                      <p className="text-lg font-bold text-violet-800">{about?.nutrition?.join(", ")}</p>
                    </div>
                  </div>
                </div>

                {/* Rainfall */}
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-4 rounded-xl border border-indigo-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 p-2 rounded-lg">
                      <CloudRain className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-indigo-700 font-medium">Rainfall</p>
                      <p className="text-lg font-bold text-indigo-800">{about?.optimalConditions?.rainfall}</p>
                    </div>
                  </div>
                </div>

                {/* Soil Type */}
                <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-4 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 p-2 rounded-lg">
                      <Sprout className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-amber-700 font-medium">Soil Type</p>
                      <p className="text-lg font-bold text-amber-800">{about?.soilType?.join(", ")}</p>
                    </div>
                  </div>
                </div>

                {/* State */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 p-2 rounded-lg">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium">States</p>
                      <p className="text-lg font-bold text-emerald-800">{about?.state?.join(", ")}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-8 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-700 p-2 rounded-lg">
                      <Bean className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium">States</p>
                      <p className="text-lg font-bold text-emerald-800">{about?.seedRequired} kg / Bigha</p>
                    </div>
                  </div>
                </div>
              </div>

              

              {/* Seasonal Information */}
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div className="col-span-2 bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-800 mb-4">Seasonal Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-purple-600" size={20} />
                      <div>
                        <p className="text-sm text-purple-700">Harvest</p>
                        <p className="font-medium text-purple-900">{about?.season?.harvesting}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Leaf className="text-purple-600" size={20} />
                      <div>
                        <p className="text-sm text-purple-700">Planting</p>
                        <p className="font-medium text-purple-900">{about?.season?.planting?.join(", ")}</p>
                      </div>
                    </div>
                  </div>
                </div>
<button onClick={()=>{
  setArea(true);  

}} className="w-full text-xl  h-12 bg-green-600 text-white ml-52 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
         Plant
</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCrop;