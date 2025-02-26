import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const Login = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL + '/admin/login', {
        email,
        password,
      },{withCredentials:true});

      if (response) {
        toast.success('Login Successfull!', {
          position: 'top-right',
          autoClose: 2000,
        });
      }

      navigate("/feed")

    } catch (error) {
      const errorMsg = error?.response?.data?.data || 'Something went wrong!';
      toast.error(errorMsg, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-100 flex justify-center items-center px-4">
      <ToastContainer />
      <div className="flex flex-col w-full max-w-sm md:max-w-md lg:max-w-lg rounded-2xl bg-white shadow-lg p-6">
        <h1 className="mt-2 font-bold text-3xl text-center">Login</h1>
        <p className="pt-2 text-sm text-center text-gray-600">Enter your details</p>

        <div className="flex flex-col mt-6">
          <label className="text-lg font-medium">Email</label>
          <input
            type="email"
            className="focus:outline-2 outline-black border border-gray-300 rounded-lg p-2 mt-1 w-full"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="text-lg font-medium mt-3">Password</label>
          <input
            type="password"
            className="focus:outline-2 outline-black border border-gray-300 rounded-lg p-2 mt-1 w-full"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>
            <div className="flex space-x-2 mt-3">
              <input type="checkbox" className="accent-black cursor-pointer" id="check" />
              <p className="opacity-70">Remember me</p>
            </div>
          </label>

          <button
            type="submit"
            onClick={Login}
            className="bg-black cursor-pointer hover:bg-black/90 transition-colors py-2 rounded-lg text-white font-semibold mt-4 w-full"
          >
            Login
          </button>
        </div>
      </div>
      <h1>admin2342@gmail.com</h1>
       
      <h1>AdminDKM</h1>
    </div>
  );
};

export default Login;
