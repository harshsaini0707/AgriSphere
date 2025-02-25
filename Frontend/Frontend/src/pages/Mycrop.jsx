import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import useValidation from "../hooks/useValidation";

const Mycrop = () => {
  useValidation();
  const [PlantedCrop, setPlantedCrop] = useState([]);
  const[loading,setLoading] = useState(true)

  const myCrop = async () => {
    if(PlantedCrop.length > 0 ){
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL+"/plantedCrop", {
        withCredentials: true,
      }); 
      console.log(response?.data?.data);
      
      setPlantedCrop(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    myCrop();
  }, []);

  const harvestCrop = async(plantedCropId) =>{
    try {
      
      const response = await axios.patch(import.meta.env.VITE_BASE_URL+"/hearvestCrop/"+plantedCropId,{},{withCredentials:true});
      console.log(response?.data?.data);
      myCrop();
      
    } catch (error) {
      console.log(error.message);
      
    }
  }

  const calculateDaysLeft = (plantedDate, duration) => {
    const plantingDate = new Date(plantedDate);
    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(harvestDate.getDate() + duration);
  
    const today = new Date();
    const timeDiff = harvestDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  
    return daysLeft > 0 ? `${daysLeft} Days To Harvest!!` : "Ready for Harvest!";
  };

  return(
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#4ade80]">
      
      <div className="fixed left-0 top-0 h-full bg-white shadow-xl z-10">
        <Dashboard />
      </div>

      {/* Main Content */}
      <main className="flex-1 pl-[120px] pr-10 py-10">
        <div className="max-w-[1600px]">
          <h1 className="text-5xl font-extrabold text-green-900 text-center mb-12 tracking-wide">
            🌱 My Planted Crops
          </h1>

          {/* Crops Grid */}
         { loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-300 animate-pulse rounded-2xl shadow-lg max-w-[700px] p-6"
            >
              <div className="h-48 bg-gray-400 rounded-lg"></div>
              <div className="h-6 w-1/2 bg-gray-500 mt-4 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-400 mt-2 rounded"></div>
              <div className="h-12 bg-gray-500 mt-4 rounded"></div>
            </div>
          ))}
        </div>
         ) : 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PlantedCrop &&
              PlantedCrop.map((crop, index) => (
                <div
                  key={index}
                  className="bg-[#c8e6c9]/70 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-102 border border-green-200 max-w-[700px] "
                >
                  {/* Crop Image */} 
                  <div className="relative">
                    <img
                      src={crop.cropId.cropPhoto}
                      alt={crop.cropId.cropName}
                      className="w-full h-56 object-cover rounded-t-2xl"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-4 py-1 rounded-full shadow-md">
                      <span className="text-sm font-medium text-gray-800">
                        🌱 Planted: {new Date(crop.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Crop Details */}
                  <div className="p-3 space-y-4">
                    <h1 className="text-3xl font-bold px-2w text-gray-900">{crop.cropId.cropName}</h1>
                    {/* <p className="text-gray-600 text-lg">{crop.cropId.about}</p> */}

                    {/* Market & Duration */}
                    <div className="grid grid-cols-3 gap-6">
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <span className="block text-sm text-gray-500">⏳ Duration</span>
                        <span className="text-lg font-semibold">{crop.cropId.duration} days</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg p-4 text-center">
                        <span className="block text-sm text-gray-500">Planted Area</span>
                        <span className="text-lg font-semibold">{crop?.area} Bigha </span>
                      </div>
                      <div className="bg-amber-100 rounded-lg p-4 text-center">
                        <span className="block text-sm text-amber-600">💰 Today's Price</span>
                        <span className="text-lg font-semibold text-amber-700">
                          ₹{crop.cropId.market.currentPrice}
                        </span>
                      </div>
                    </div>

                    {/* Optimal Conditions */}
                    <div className="bg-green-50 rounded-lg p-5">
                      <h2 className="font-semibold text-green-900 text-lg mb-2">🌦️ Optimal Conditions</h2>
                      <div className="grid grid-cols-2 gap-2 text-lg">
                        <div className="text-green-800">
                          <span className="block text-sm text-green-600">🌡️ Temperature</span>
                          <span>{crop.cropId.optimalConditions.temperature}</span>
                        </div>
                        <div className="text-green-800">
                          <span className="block text-sm text-green-600">💧 Humidity</span>
                          <span>{crop.cropId.optimalConditions.humidity}</span>
                        </div>
                        <div className="text-green-800">
                          <span className="block text-sm text-green-600">🌧️ Rainfall</span>
                          <span>{crop.cropId.optimalConditions.rainfall}</span>
                        </div>
                        <div className="text-green-800">
                          <span className="block text-sm text-green-600">🚰 Water Needed</span>
                          <span>{crop.cropId.waterRequirement.join("-")}L</span>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-3 text-lg">
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <span className="block text-sm text-gray-600">🌾 Fertilizer Required</span>
                        <span className="font-medium">{crop.cropId.nutrition.join(", ")}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <span className="block text-sm text-gray-600">🌿 Planting Season</span>
                          <span className="font-medium">{crop.cropId.season.planting.join(", ")}</span>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                          <span className="block text-sm text-gray-600">🚜 Harvest Season</span>
                          <span className="font-medium">{crop.cropId.season.harvesting}</span>
                        </div>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-4 text-center">

  <span className="text-xl font-bold text-yellow-900">
    {calculateDaysLeft(crop.createdAt, crop.cropId.duration) } 
  </span>
</div>
                     
                    </div>

                    {/* Harvest Button */}
                    <button onClick={()=>harvestCrop(crop._id)} className=" w-full bg-amber-500 hover:bg-orange-600 text-white py-4 rounded-lg font-medium shadow-md text-lg transition-all transform hover:scale-105">
                      🌾 Harvest
                    </button>
                  </div>
                </div>
              ))}
          </div>
            }
          {/* No Crops Available */}
          {PlantedCrop.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">🚜 No planted crops found. Start farming now!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Mycrop;
