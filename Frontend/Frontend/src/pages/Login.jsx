import React, { useState } from "react";
import backgroundImage from "../assets/9372015.jpg";
import { Link, useNavigate } from "react-router-dom"; 
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser }  from "../store/UserSlice"

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState("");
  
  

  const login = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL+"/login",
        { email, password },
        { withCredentials: true }
      );

      //console.log(response.data.data);
      dispatch(addUser(response?.data?.data));
      setError("");

      return navigate("/userHome")

    } catch (error) {
      console.log(error.response?.data?.message);
      setError(error.response?.data?.message)
     
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border-1 border-gray-200">
          <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Welcome back</h1>
            <p className="text-gray-500 mt-2">Please enter your details</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="w-full px-4 py-3  rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150 font-mono"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Password
              </label>
              <input
              required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg font-mono border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                placeholder="Enter password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                required
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <label className="ml-2 text-sm text-gray-600 font-serif">Remember me</label>
              </div>
            </div>

            {err ? <h1 className="text-center text-red-600 font-semibold font-mono" >{err}</h1>:""}

            {/* Login Button */}
            <button
              type="button" 
              onClick={login}
              className="w-full font-mono bg-[#30bc6a] hover:bg-[#19a854] text-white py-3 px-4 rounded-lg focus:ring-4 focus:ring-blue-200 transition duration-150 text-xl"
            >
              Login
            </button>

          
            <div className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

    
      <div
        className="hidden md:block w-200 h-120 mt-13 mr-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
    </div>
  );
};

export default Login;
