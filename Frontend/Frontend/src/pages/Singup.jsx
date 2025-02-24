import React, { useState } from "react";
import backgroundImage from "../assets/7922065.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios  from "axios"; 
import { useDispatch } from "react-redux";
import { addUser } from "../store/UserSlice";

const Signup = () => {
  const[firstName , setFirstName] = useState("");
  const[lastName , setLastname] = useState("");
  const[email , setEmail] = useState("");
  const[password , setPassword] = useState("");
  const[err,setError] =useState("");

  const navigate = useNavigate();
const dispatch = useDispatch();

  const signup = async()=>{
    try {
     event.preventDefault();

      const response = await axios.post(import.meta.env.VITE_BASE_URL+"/signup",{
        firstName,lastName,email,password
      },{withCredentials:true})

      console.log(response?.data?.data);
      dispatch(addUser(response?.data?.data))
      setError("")
      navigate("/profile")
      
    } catch (error) {
      console.log(error?.response?.data);
      setError(error?.response?.data);
    }
  }
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFFFF]">

        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">REGISTER NOW!</h1>
              <p className="text-gray-500 mt-2">Please enter your details</p>
            </div>

         
            <form className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="Enter your First Name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Last Name
                </label>
                <input
                  value={lastName}
                  onChange={(e)=>setLastname(e.target.value)}
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="Enter your Last Name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Email
                </label>
                <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="Enter your Email"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="Enter your Password"
                />
              </div>
     {err ? <h1 className="font-bold text-red-500 text-start">{err}</h1>:""}

              <button
                
                onClick={signup}
                className="w-full bg-[#30bc6a] hover:bg-[#19a854] text-white py-3 px-4 rounded-lg focus:ring-4 focus:ring-green-200 transition duration-150 font-medium"
              >
                Sign Up
              </button>

              
              <div className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div
          className=" w-full md:w-1/2 h-[500px] md:h-screen bg-cover bg-center bg-no-repeat  mt-4 mr-8"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      </div>
    </>
  );
};

export default Signup;
