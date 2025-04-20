import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { useNavigate } from "react-router";
import useValidation from "../hooks/useValidation";
import { useSelector } from "react-redux";
import { Sun, Thermometer, Droplets, Calendar } from "lucide-react";
import Chatbot from "./Chat/Chatbot";

const UserHome = () => {
  useValidation();
  const [Data, setData] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store) => store.user || " ");
  const location = user?.Location || "Delhi";
  const [weatherData, setWeatherData] = useState(null);

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${
          import.meta.env.VITE_Weather_Key
        }&q=${user.Location || "Delhi"}&aqi=no`
      );
      setWeatherData(response?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error("Error fetching weather:", error.message);
      }
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_BASE_URL + "/homeData",
        { withCredentials: true }
      );
      setData(response?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching home data:", error.message);
    }
  };

  useEffect(() => {
    getData();
    getWeather();
  }, [location]);

  return (
    <div className="flex min-h-screen bg-gray-300"> 
      <Dashboard />
      <Chatbot/>
      <div className="flex flex-col items-center justify-center w-full p-6">
        {/* Weather Card */}
        <div className="mb-8 bg-[#f3f4f6]/80 backdrop-blur-sm shadow-md border border-[#e5e7eb] rounded-xl p-8 w-[90%] max-w-md transition-all duration-300 hover:scale-105"> {/* Light gray */}
          <div className="text-[#374151] flex flex-col space-y-5">
            <div className="flex items-center space-x-3">
              <Sun className="w-8 h-8 text-[#facc15]" />
              <h1 className="font-extrabold text-3xl tracking-wide text-[#facc15]">
                Weather
              </h1>
            </div>
            <p className="text-lg tracking-wider opacity-70 text-[#6b7280]">Current Conditions</p>

            {weatherData ? (
              <div className="flex flex-col items-center">
                <h1 className="text-5xl font-bold text-[#4b5563]">
                  {weatherData?.current?.temp_c}°C
                </h1>
                <div className="flex items-center mt-2">
                  <img
                    className="h-12 w-14 object-contain"
                    src={`https:${weatherData?.current?.condition?.icon}`}
                    alt="Weather Icon"
                  />
                  <h2 className="text-xl font-medium text-[#6b7280] ml-2">
                    {weatherData?.current?.condition?.text}
                  </h2>
                </div>
                <div className="mt-4 flex items-center space-x-6">
                  <div className="flex items-center text-sm opacity-70 text-[#6b7280]">
                    <Droplets className="w-4 h-4 mr-1 text-[#60a5fa]" />
                    <span>{weatherData?.current?.humidity}%</span>
                  </div>
                  <div className="flex items-center text-sm opacity-70 text-[#6b7280]">
                    <Thermometer className="w-4 h-4 mr-1 text-[#ef4444]" />
                    <span>Feels like {weatherData?.current?.feelslike_c}°C</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#4b5563]">
                <p className="text-lg font-semibold opacity-70">Fetching Weather...</p>
                <div className="h-8 w-8 border-4 border-t-transparent animate-spin border-[#facc15] rounded-full mt-2"></div>
              </div>
            )}
            <div className="mt-6 pt-4 border-t border-[#d1d5db] text-center">
              <button
                onClick={() => {
                  const weather = document.getElementById("weekly-forecast");
                  weather?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-[#facc15] hover:text-[#eab308] transition-colors duration-200"
              >
                Weekly Forecast <Calendar className="inline-block w-4 h-4 ml-1 align-text-top" />
              </button>
            </div>
          </div>
        </div>

        {/* Crop Status Card */}
        <div className="mb-8 bg-[#f3f4f6]/80 backdrop-blur-sm shadow-md border border-[#e5e7eb] rounded-xl p-8 w-[90%] max-w-md transition-transform duration-300 hover:scale-105"> {/* Light gray */}
          <div className="text-[#374151] flex flex-col space-y-5">
            <h1 className="text-3xl font-extrabold tracking-wide text-[#84cc16]">
              Crop Status
            </h1>
            <p className="text-lg opacity-70 text-[#6b7280]">Your Current Farm Overview</p>
            {Data ? (
              <div className="space-y-3 text-lg">
                <div className="flex justify-between items-center py-2 border-b border-[#d1d5db]">
                  <span className="font-semibold text-[#a3e635]">Planted Crop:</span>
                  <span className="font-bold text-[#84cc16]">{Data.plantedCrop}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-semibold text-[#f59e0b]">Harvested Crop:</span>
                  <span className="font-bold text-[#f97316]">{Data.harvestedCrop}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-[#4b5563]">
                <p className="text-lg font-semibold opacity-70">Fetching Crop Data...</p>
                <div className="w-8 h-8 border-4 border-t-transparent animate-spin border-[#84cc16] rounded-full mt-2"></div>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Forecast Section */}
        <div
          id="weekly-forecast"
          className="mt-8 bg-[#f3f4f6]/80 backdrop-blur-sm shadow-md border border-[#e5e7eb] rounded-xl p-8 w-[90%] max-w-md transition-transform duration-300 hover:scale-105"
        >
          <h1 className="text-[#374151] text-2xl font-semibold mb-4">Weekly Forecast</h1>
        
         
        </div>
      </div>
    </div>
  );
};

export default UserHome;

