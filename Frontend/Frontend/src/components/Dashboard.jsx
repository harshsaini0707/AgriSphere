import React, { useState } from 'react';
import { Home, MessageCircle, Users, User, ChevronLeft } from 'lucide-react';
import { Sprout ,Tractor ,CalendarCheck ,ListCollapse,LayoutDashboard ,LogOut ,Leaf,CloudSun} from 'lucide-react';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/UserSlice';
import { useNavigate } from 'react-router';
import useValidation from '../hooks/useValidation';

const Dashboard = () => {
   useValidation(); 
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store)=>store?.user)

  const logout = async() =>{
try {
  const response = await axios.post(import.meta.env.VITE_BASE_URL+"/logout",{},{
    withCredentials:true
  })
  console.log(response?.data?.message);
  dispatch(removeUser());
  
  
   navigate("/login");
  
} catch (error) {
  console.log(error);
  
}
  }

  const navItems = [
    
    { name: 'Dashboard', icon: <LayoutDashboard onClick={()=>navigate("/userHome")} className="w-5 h-5" /> },
    { name: 'Suggestion', icon: <Leaf onClick={()=>navigate("/suggestion")} className="w-5 h-5" /> },
    { name: 'My Crop', icon: <Sprout onClick={()=>navigate("/mycrop")} className="w-5 h-5" /> },
    { name: 'Harvested Crop', icon: <Tractor onClick={()=>navigate("/harvestedCrop")} className="w-5 h-5" /> },
    { name: 'Task', icon: <CalendarCheck onClick={()=>navigate("/task")} className="w-5 h-5" /> },
  
    { name: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
    { name: 'Community', icon: <Users onClick={()=> navigate("/community")} className="w-5 h-5" /> },
    { name: 'Profile', icon: <User onClick={()=>navigate("/profile")} className="w-5 h-5" /> },
    { name: 'Logout', icon: <LogOut onClick={logout} className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen max-w-fit bg-gradient-to-br from-[#22c55e] via-[#a3e499] to-[#dcfce7]"> {/* Earthy green gradient */}
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full p-4
        bg-white/20 backdrop-blur-lg shadow-2xl rounded-r-3xl 
        transform transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        {/* Logo & Collapse Button */}
        <div className="flex items-center justify-between">
          {!isCollapsed && <h1 className="text-xl font-bold text-white">AgriSphere</h1>}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/30 rounded-full" 
          >
            {isCollapsed ? <ListCollapse className="w-6 h-6 text-white" /> : <ChevronLeft className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a className={`
                flex items-center px-4 py-3 text-white transition-all duration-300
                rounded-xl hover:bg-white/30 hover:text-[#16a345]  
                ${isCollapsed ? 'justify-center' : ''}
              `}>
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </a>

              {/* Tooltip when collapsed */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-black/80 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"> 
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 flex items-center mt-auto">
          <img src={user?.profilePhoto} alt="User" className="w-13 h-13 object-cover rounded-full border-2 border-white" />
          {!isCollapsed && <h1 className="text-white font-semibold ml-3">{user?.firstName} {user?.lastName}</h1>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
