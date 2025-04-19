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
  Gauge,
  FlaskConical,
  Bean,
} from "lucide-react";
import useValidation from "../hooks/useValidation";

const AboutCrop = () => {
  useValidation();
  const [about, setAbout] = useState({});
  const [toast, setToast] = useState(false);
  const [area, setArea] = useState(false);
  const [inputArea, setInputArea] = useState(1);
  const req = useParams();

  const aboutCrop = async () => {
    try {
      const cropId = req.cropId;
      if (!cropId) return;
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + `/aboutCrop/${cropId}`,
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.data);

      setAbout(response?.data?.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const plantCrop = async (cropId) => {
    try {
      if (!cropId) return;
      await axios.post(
        import.meta.env.VITE_BASE_URL + `/plantCrop/${cropId}`,
        {
          cropId,
          area: inputArea,
        },
        { withCredentials: true }
      );
      setToast(true);
      setInputArea(1); // Reset input area after planting
      setArea(false);
      setTimeout(() => {
        setToast(false);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    aboutCrop();
  }, [req]);

  return (
    <Dashboard>
      <div className="min-h-screen bg-[#f4f5f7] py-6 sm:py-12">
        <div className="relative sm:px-6 lg:px-8 mx-auto">
          {toast && (
            <div className="fixed top-5 right-5 flex font-bold items-center bg-green-500 text-white px-4 py-2 rounded-md shadow-lg transition-all duration-300 ease-in-out animate-fade-in-down z-10">
              <CheckCircle className="mr-2" size={20} />
              <span>Crop Planted Successfully!</span>
            </div>
          )}
          {area && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
              <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
                  Enter Planting Area
                </h2>
                <input
                  type="number"
                  placeholder="Area (in Bigha)"
                  min="1"
                  value={inputArea}
                  onChange={(e) => setInputArea(parseInt(e.target.value, 10) || 1)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <p className="mt-2 text-sm text-gray-600">
                  Seed Required: ~
                  <span className="font-semibold">
                    {about?.seedRequired * inputArea} kg
                  </span>{" "}
                  in {inputArea} Bigha
                </p>
                <div className="flex justify-end mt-4 gap-2">
                  <button
                    onClick={() => setArea(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => plantCrop(about._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                  >
                    Confirm Plant
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden sm:rounded-3xl">
            <div className="bg-gradient-to-r from-green-500 to-green-600 py-8 px-6 sm:px-12 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.1)_0%,transparent_70%)]"></div>
              <h1 className="text-white text-center font-bold mb-4 text-2xl sm:text-3xl relative z-10">
                {about.cropName}
              </h1>
              <p className="text-lg text-white text-center relative z-10">
                {about?.about}
              </p>
            </div>

            <div className="p-6 sm:p-12">
              <div className="flex flex-col items-center mb-8">
                {about.cropPhoto && (
                  <div className="relative group w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={about.cropPhoto}
                      alt={about.cropName}
                      className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-md">
                      <IndianRupee className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-green-700 font-medium">
                        Market Price
                      </p>
                      <p className="text-lg font-semibold text-green-800">
                        {about?.market?.currentPrice}/kg
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500 p-2 rounded-md">
                      <Timer className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-blue-700 font-medium">
                        Duration
                      </p>
                      <p className="text-lg font-semibold text-blue-800">
                        {about.duration} days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-cyan-500 p-2 rounded-md">
                      <Droplets className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-cyan-700 font-medium">
                        Water Requirement
                      </p>
                      <p className="text-lg font-semibold text-cyan-800">
                        {about?.waterRequirement?.join("-")} Days
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-500 p-2 rounded-md">
                      <Thermometer className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-red-700 font-medium">
                        Temperature
                      </p>
                      <p className="text-lg font-semibold text-red-800">
                        {about?.optimalConditions?.temperature}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-sky-500 p-2 rounded-md">
                      <Gauge className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-sky-700 font-medium">
                        Humidity
                      </p>
                      <p className="text-lg font-semibold text-sky-800">
                        {about?.optimalConditions?.humidity}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-violet-500 p-2 rounded-md">
                      <FlaskConical className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-violet-700 font-medium">
                        Nutrition
                      </p>
                      <p className="text-lg font-semibold text-violet-800">
                        {about?.nutrition?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-indigo-500 p-2 rounded-md">
                      <CloudRain className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-indigo-700 font-medium">
                        Rainfall
                      </p>
                      <p className="text-lg font-semibold text-indigo-800">
                        {about?.optimalConditions?.rainfall}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 p-2 rounded-md">
                      <Sprout className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-amber-700 font-medium">
                        Soil Type
                      </p>
                      <p className="text-lg font-semibold text-amber-800">
                        {about?.soilType?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 sm:col-span-2">
                  <div className="flex items-center gap-3">
                    <div className="bg-emerald-500 p-2 rounded-md">
                      <Bean className="text-white" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700 font-medium">
                        Seed Requirement
                      </p>
                      <p className="text-lg font-semibold text-emerald-800">
                        {about?.seedRequired} kg / Bigha
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  Seasonal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-3">
                    <Calendar className="text-purple-600" size={20} />
                    <div>
                      <p className="text-sm text-purple-700">Harvest</p>
                      <p className="font-semibold text-purple-900">
                        {about?.season?.harvesting}
                      </p>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-3">
                    <Leaf className="text-purple-600" size={20} />
                    <div>
                      <p className="text-sm text-purple-700">Planting</p>
                      <p className="font-semibold text-purple-900">
                        {about?.season?.planting?.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setArea(true)}
                  className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
                >
                  Plant Crop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default AboutCrop;