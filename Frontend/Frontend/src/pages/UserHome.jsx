import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { useNavigate } from "react-router";
import useValidation from "../hooks/useValidation";
import { useSelector } from "react-redux";


const UserHome = () => {
  useValidation();
  const [Data, setData] = useState("");
  const navigate = useNavigate();
  const user = useSelector((store)=>store.user || " ");
  const[weatherData , setWeatherData] = useState(user.Location || " ")


  const getWeather = async()=>{
   try {
    const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_Weather_Key}&q=${user.Location || " " }&aqi=no`);
    //console.log(response?.data);
    setWeatherData(response?.data)
   } catch (error) {
    if(error.response?.status === 401){
      navigate("/login");
    }else{
      console.log(error.message);
      
    }
   }
    
  }
  

  const getData = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BASE_URL+"/homeData", { withCredentials: true });
      setData(response?.data);
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      }
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  
  }, []);
  
  useEffect(() => {
   getWeather()
  
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br  
 from-[#0f766e] via-[#22c55e] to-[#4ade80]

">
      <Dashboard />
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className= " mb-5 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl  p-8 w-[80%] max-w-lg transition-all duration-300 hover:scale-105 ">
        {
          weatherData  ? (
            <div className="flex flex-col  text-white">
  <h1 className="font-extrabold text-4xl tracking-wide text-white/95">Weather</h1>
  <p className="text-lg tracking-wider pt-2 opacity-80">Today's Forecast</p>

  <div className="mt-6 flex flex-col items-center">
    <h1 className="text-5xl font-bold">{weatherData?.current?.temp_c}°C</h1>
    
    <div className="flex items-center mt-1 ">
      <img className="h-12 w-14 pt-1" src={weatherData?.current?.condition?.icon} alt="Weather Icon" />
      <h2 className="text-xl font-medium pr-8">{weatherData?.current?.condition?.text}</h2>
    </div>

    <h2 className="text-lg font-medium pl-3">Humidity: {weatherData?.current?.humidity}%</h2>
  </div>
  <div className="border-t justify-center items-center ml-28 pt-4 border-white  w-1/2 mt-4"> </div>
  <h1 onClick={
       ()=>{
        const weather = document.getElementById('weather');
       weather?.scrollIntoView({ behavior: 'smooth' });
       }
  } className="ml-36 hover:cursor-pointer">Weekly ForeCast - </h1>
</div>

          ) :(
            <div className="flex flex-col justify-center items-center text-white">
            <p className="text-2xl font-semibold">Fetching Weather...</p>
              <div className="h-10 w-10 border-5 border-t-transparent animate-spin border-white rounded-full mt-3"></div>

            </div>
          )
        }
        </div>
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-8 w-[80%] max-w-lg transition-transform duration-300 hover:scale-105">
          {Data ? (
            <>
              <h1 className="text-white text-4xl font-extrabold  mb-6 tracking-wide">
                 Crop Status
              </h1>
              <div className="text-white space-y-4 text-lg">
                <p className="flex justify-between border-b border-white/30 pb-3">
                  <span className="font-bold text-green-100 ">Planted Crop:</span>
                  <span  className="font-bold">{Data.plantedCrop}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold ">Harvested Crop:</span>
                  <span className="font-bold">{Data.harvestedCrop}</span>
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <p className="text-2xl font-semibold">Fetching Crop...</p>
              <div className="w-10 h-10 border-5 border-white border-t-transparent rounded-full animate-spin mt-3"></div>
            </div>
          )}
        </div>
        <div id="weather" className="mt-7  bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-8 w-[80%] max-w-lg transition-transform duration-300 hover:scale-105">
<h1>Weekly Forecast</h1>
      </div>
      </div>
     
    </div>
  );
};

export default UserHome;
