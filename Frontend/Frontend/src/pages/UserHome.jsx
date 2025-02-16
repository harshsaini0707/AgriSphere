import React, { useState, useEffect } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { useNavigate } from "react-router";
import useValidation from "../hooks/useValidation";


const UserHome = () => {
  useValidation();
  const [Data, setData] = useState("");
  const navigate = useNavigate();

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

  return (
    <div className="flex min-h-screen bg-gradient-to-br  
 from-[#0f766e] via-[#22c55e] to-[#4ade80]

">
      <Dashboard />
      <div className="flex flex-col items-center justify-center w-full p-6">
        <div className="bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-8 w-[80%] max-w-lg transition-transform duration-300 hover:scale-105">
          {Data ? (
            <>
              <h1 className="text-white text-4xl font-extrabold text-center mb-6 tracking-wide">
                🌿 Crop Status
              </h1>
              <div className="text-white space-y-4 text-lg">
                <p className="flex justify-between border-b border-white/30 pb-3">
                  <span className="font-semibold text-green-300">Planted Crop:</span>
                  <span>{Data.plantedCrop}</span>
                </p>
                <p className="flex justify-between">
                  <span className="font-semibold text-amber-400">Harvested Crop:</span>
                  <span>{Data.harvestedCrop}</span>
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-white">
              <p className="text-2xl font-semibold">Fetching Data...</p>
              <div className="w-10 h-10 border-5 border-white border-t-transparent rounded-full animate-spin mt-3"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
