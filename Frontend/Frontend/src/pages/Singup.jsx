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
  const[Location , setLocation] =  useState('');
  const[State, setState] = useState('')
  const[err,setError] =useState("");
  const[loading,setLoading] = useState(false);

  const navigate = useNavigate();
const dispatch = useDispatch();

  const signup = async()=>{
    setLoading(true)
    try {
  
      const response = await axios.post(import.meta.env.VITE_BASE_URL+"/signup",{
        firstName,lastName,email,password,Location:Location,State:State
      },{withCredentials:true})

      console.log(response?.data?.data);
      dispatch(addUser(response?.data?.data))
      setError("")
      navigate("/userHome")
      
    } catch (error) {
      console.log(error?.response?.data);
      setError(error?.response?.data);
    }finally{
      setLoading(false)
    }
  }
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row bg-[#FFFFFF]">

        <div className="w-full md:w-1/2 flex items-center justify-center p-6">
          <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-lg">
            
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">REGISTER NOW!</h1>
              <p className="text-gray-500 mt-2">Please enter your details</p>
            </div>

         
          
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e)=>setFirstName(e.target.value)}
                  className="w-full px-4 py-3 font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
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
                  className="w-full px-4 font-mono py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
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
                  className="w-full px-4 py-3 font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
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
                  className="w-full px-4 py-3 font-mono rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="Enter your Password"
                />
              </div>
              <div>
  <label className="text-sm font-medium text-gray-700 block mb-2">
    State / Union Territory
  </label>
  <select
    value={State}
    required
    onChange={(e) => setState(e.target.value)}
    className="w-full px-4 font-mono py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
  >
    <option value="">Select your State / UT</option>
    <option value="Andhra Pradesh">Andhra Pradesh</option>
    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
    <option value="Assam">Assam</option>
    <option value="Bihar">Bihar</option>
    <option value="Chhattisgarh">Chhattisgarh</option>
    <option value="Goa">Goa</option>
    <option value="Gujarat">Gujarat</option>
    <option value="Haryana">Haryana</option>
    <option value="Himachal Pradesh">Himachal Pradesh</option>
    <option value="Jharkhand">Jharkhand</option>
    <option value="Karnataka">Karnataka</option>
    <option value="Kerala">Kerala</option>
    <option value="Madhya Pradesh">Madhya Pradesh</option>
    <option value="Maharashtra">Maharashtra</option>
    <option value="Manipur">Manipur</option>
    <option value="Meghalaya">Meghalaya</option>
    <option value="Mizoram">Mizoram</option>
    <option value="Nagaland">Nagaland</option>
    <option value="Odisha">Odisha</option>
    <option value="Punjab">Punjab</option>
    <option value="Rajasthan">Rajasthan</option>
    <option value="Sikkim">Sikkim</option>
    <option value="Tamil Nadu">Tamil Nadu</option>
    <option value="Telangana">Telangana</option>
    <option value="Tripura">Tripura</option>
    <option value="Uttar Pradesh">Uttar Pradesh</option>
    <option value="Uttarakhand">Uttarakhand</option>
    <option value="West Bengal">West Bengal</option>
    <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
    <option value="Chandigarh">Chandigarh</option>
    <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
    <option value="Delhi">Delhi</option>
    <option value="Jammu and Kashmir">Jammu and Kashmir</option>
    <option value="Ladakh">Ladakh</option>
    <option value="Lakshadweep">Lakshadweep</option>
    <option value="Puducherry">Puducherry</option>
  </select>
</div>


              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Location
                </label>
                <input
                  value={Location}
                  onChange={(e)=>setLocation(e.target.value)}
                  type="text"
                  className="w-full px-4 font-mono py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                  placeholder="Please Enter Correct Location Spelling"
                  required
                />
              </div>
     {err ? <h1 className="font-bold text-red-500 text-start">{err}</h1>:""}

     <button
  onClick={signup}
  disabled={loading}
  className="w-full text-lg font-mono bg-[#30bc6a] hover:bg-[#19a854] text-white py-3 px-4 rounded-lg focus:ring-4 focus:ring-green-200 transition duration-150 font-medium flex items-center justify-center gap-2 disabled:opacity-50"
>
  {loading ? (
    <>
      <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
      </svg>
      Signing up...
    </>
  ) : (
    "SignUp"
  )}
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
