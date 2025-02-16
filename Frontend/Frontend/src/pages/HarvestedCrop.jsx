import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { Sprout, Tractor, Calendar, Clock } from "lucide-react";
import useValidation from "../hooks/useValidation";

const HarvestedCrop = () => {
  useValidation();
  const [harvestCrop, setHarvestCrop] = useState([]);
  const[loading,setLoading] = useState(true)

  const harvestedCrop = async () => {
    if(harvestCrop.length > 0){
      setLoading(false);
      return;
    }
    try {
      const crop = await axios.get(import.meta.env.VITE_BASE_URL+"/harvestCrop", {
        withCredentials: true,
      });
      setHarvestCrop(crop?.data?.data);
    } catch (error) {
      console.log(error.message);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    harvestedCrop();
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#4ade80]">
      {/* Sidebar */}
      <div className="  left-0 top-0 h-full bg-white shadow-xl z-10">
        <Dashboard />
      </div>

      {/* Main Content */}
      <main className="flex-1 pl-[100px] pr-6">
        <div className="max-w-[1400px] mx-auto py-10">
          <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-12 tracking-wide">
            🌾 Harvested Crops
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
       ) : (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {harvestCrop &&
              harvestCrop.map((crop) => (
                <div
                  key={crop._id}
                  className="bg-[#c8e6c9]/70 backdrop-blur-lg   rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                >
                  {/* Crop Image */}
                  <div className="relative">
                    <img
                      src={crop.cropId.cropPhoto}
                      alt={crop.cropId.cropName}
                      className="w-full h-56 object-cover rounded-t-2xl"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h2 className="text-2xl font-bold text-white tracking-wide">
                        {crop.cropId.cropName}
                      </h2>
                    </div>
                  </div>

                  {/* Crop Details */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center space-x-3 text-gray-700">
                      <Calendar className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="text-sm">
                          <span className="font-semibold text-gray-800">Planted:</span>{" "}
                          <span className="text-blue-700 font-semibold">
                            {new Date(crop.plantedAt).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="text-sm">
                           <span className="font-semibold text-gray-800">Harvested:</span>{" "}
                          <span className="text-green-700 font-semibold">
                            {new Date(crop.updatedAt).toLocaleDateString()}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-700">
                      <Clock className="w-6 h-6 text-purple-600 flex-shrink-0" />
                      <p className="text-sm">
                         <span className="font-semibold text-gray-800">Duration:</span>{" "}
                        <span className="text-purple-700 font-semibold">
                          {crop.cropId.duration} days
                        </span>
                      </p>
                    </div>

                    {/* Seasons Info */}
                    <div className="space-y-3 pt-4  border-t-2 border-gray-500">
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Sprout className="w-6 h-8 text-green-700 flex-shrink-0" />
                        <p className="text-sm">
                           <span className="font-semibold text-gray-800">Planting Season:</span>{" "}
                          <span className="text-green-800 font-semibold">
                            {crop.cropId.season.planting}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-700">
                        <Tractor className="w-6 h-8 text-orange-500 flex-shrink-0" />
                        <p className="text-sm">
                           <span className="font-semibold text-gray-800 ">Harvest Season:</span>{" "}
                          <span className="text-orange-700 font-semibold">
                            {crop.cropId.season.harvesting}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>)
}
          {/* No Crops Available */}
          {harvestCrop.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                🚜 No harvested crops available. Start planting now!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HarvestedCrop;
