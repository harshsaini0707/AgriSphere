import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import useValidation from "../hooks/useValidation";

const Mycrop = () => {
  useValidation();
  const [PlantedCrop, setPlantedCrop] = useState([]);
  const [loading, setLoading] = useState(true);

  const myCrop = async () => {
    if (PlantedCrop.length > 0) {
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/plantedCrop",
        { withCredentials: true }
      );
      setPlantedCrop(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    myCrop();
  }, []);

  const harvestCrop = async (plantedCropId) => {
    try {
      await axios.patch(
        import.meta.env.VITE_BASE_URL + "/hearvestCrop/" + plantedCropId,
        {},
        { withCredentials: true }
      );
      myCrop();
    } catch (error) {
      console.log(error.message);
    }
  };

  const calculateDaysLeft = (plantedDate, duration) => {
    const plantingDate = new Date(plantedDate);
    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(harvestDate.getDate() + duration);
    const today = new Date();
    const timeDiff = harvestDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysLeft > 0 ? `${daysLeft} Days To Harvest!!` : "Ready for Harvest!";
  };

  return (
    <Dashboard>
    <div className="flex min-h-screen bg-gray-300">
    
      <div className="fixed left-0 top-0 h-full bg-gray-200 shadow-lg z-10">
      
      </div>
      
      <main className="flex-1 pl-10 pr-6 md:pr-10 py-10">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center mb-12 tracking-wide">
            🌿 Your Planted Crops
          </h1>

        
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-500 animate-pulse rounded-2xl shadow-md p-6"
                >
                  <div className="h-44 bg-gray-400 rounded-lg"></div>
                  <div className="h-6 w-1/2 bg-gray-300 mt-4 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-300 mt-2 rounded"></div>
                  <div className="h-10 bg-gray-500 mt-4 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {PlantedCrop.map((crop, index) => (
                <div
                  key={index}
                  className="bg-gray-300 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 border border-green-200"
                >
               
                  <div className="relative">
                    <img
                      src={crop.cropId.cropPhoto}
                      alt={crop.cropId.cropName}
                      className="w-full h-48 md:h-56 object-cover rounded-t-2xl"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow text-sm text-gray-700 font-medium">
                      🌱 {new Date(crop.createdAt).toLocaleDateString()}
                    </div>
                  </div>

         
                  <div className="p-5 space-y-4">
                    <h2 className="text-2xl font-bold text-green-800">
                      {crop.cropId.cropName}
                    </h2>

                    <div className="grid grid-cols-3 gap-3 text-center text-sm">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <p className="text-gray-500">⏳ Duration</p>
                        <p className="text-green-800 font-semibold">
                          {crop.cropId.duration} days
                        </p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <p className="text-gray-500">Planted Area</p>
                        <p className="text-green-800 font-semibold">{crop?.area} Bigha</p>
                      </div>
                      <div className="bg-yellow-100 p-3 rounded-lg">
                        <p className="text-yellow-600">💰 Price</p>
                        <p className="text-yellow-800 font-semibold">
                          ₹{crop.cropId.market.currentPrice}
                        </p>
                      </div>
                    </div>

                 
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-green-700 mb-2">
                        🌦️ Optimal Conditions
                      </h3>
                      <div className="grid grid-cols-2 gap-2 text-sm text-green-800">
                        <div>
                          <p className="text-green-600">🌡️ Temperature</p>
                          <p>{crop.cropId.optimalConditions.temperature}</p>
                        </div>
                        <div>
                          <p className="text-green-600">💧 Humidity</p>
                          <p>{crop.cropId.optimalConditions.humidity}</p>
                        </div>
                        <div>
                          <p className="text-green-600">🌧️ Rainfall</p>
                          <p>{crop.cropId.optimalConditions.rainfall}</p>
                        </div>
                        <div>
                          <p className="text-green-600">🚰 Water</p>
                          <p>{crop.cropId.waterRequirement.join("-")} L / Bigha </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-gray-500">🌿 Planting Season</p>
                        <p className="font-medium">
                          {crop.cropId.season.planting.join(", ")}
                        </p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <p className="text-gray-500">🚜 Harvest Season</p>
                        <p className="font-medium">{crop.cropId.season.harvesting}</p>
                      </div>
                      <div className="col-span-2 bg-gray-100 p-3 rounded-lg">
                        <p className="text-gray-500">🌾 Fertilizer</p>
                        <p className="font-medium">
                          {crop.cropId.nutrition.join(", ")}
                        </p>
                      </div>
                    </div>

                
                    <div className="bg-yellow-100 text-center p-3 rounded-lg">
                      <p className="font-bold text-yellow-900 text-lg">
                        {calculateDaysLeft(crop.createdAt, crop.cropId.duration)}
                      </p>
                    </div>

                    
                    <button
                      onClick={() => harvestCrop(crop._id)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-semibold transition duration-200"
                    >
                      🌾 Harvest
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

       
          {!loading && PlantedCrop.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600 text-xl">
                🚜 No planted crops found. Start farming now!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
    </Dashboard >
  );
};

export default Mycrop;
