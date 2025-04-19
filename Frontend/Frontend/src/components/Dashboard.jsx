import React, { useState } from 'react';
import {
  Home,
  MessageCircle,
  Users,
  User,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Tractor,
  CalendarCheck,
  LayoutDashboard,
  LogOut,
  Leaf,
  ShoppingBag 
} from 'lucide-react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../store/UserSlice';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';

const Dashboard = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store?.user);

  const logout = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL+"/logout", {}, {
        withCredentials: true
      });
      console.log(response?.data?.message);
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" />, route: "/userHome" },
    { name: 'Suggestion', icon: <Leaf className="w-6 h-6" />, route: "/suggestion" },
    { name: 'My Crop', icon: <Sprout className="w-6 h-6" />, route: "/mycrop" },
    { name: 'Harvested Crop', icon: <Tractor className="w-6 h-6" />, route: "/harvestedCrop" },
    { name: 'Task', icon: <CalendarCheck className="w-6 h-6" />, route: "/task" },
    { name: 'Chat', icon: <MessageCircle className="w-6 h-6" />, route: "/chat" },
    { name: 'Community', icon: <Users className="w-6 h-6" />, route: "/community" },
    { name: 'MarketPlace', icon: <ShoppingBag  className="w-6 h-6" />, route: "/marketplace" },
    { name: 'Profile', icon: <User className="w-6 h-6" />, route: "/profile" },
    { name: 'Logout', icon: <LogOut onClick={logout} className="w-6 h-6" />, action: logout },
  ];

  return (
    <div className="flex min-h-screen bg-[#ece3e3e9]">
     
      <aside className={`fixed top-0 left-0 h-full bg-gradient-to-b from-green-800 to-green-950 shadow-lg transition-all duration-300 z-20 ${isCollapsed ? 'w-16' : 'w-64'}`}>
        
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">AgriSphere</h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-green-900 rounded-full text-white focus:outline-none"
          >
            {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

       
        <nav className="mt-4">
          {navItems.map((item, index) => (
            <div key={index} className="relative group">
              <a
                onClick={() => item.route ? navigate(item.route) : item.action && item.action()}
                className={`
                  flex items-center px-4 py-3 text-gray-300 cursor-pointer
                  hover:bg-green-900 hover:text-white transition-colors duration-300
                  ${isCollapsed ? 'justify-center' : ''}
                  ${location.pathname === item.route ? 'bg-green-900 text-white' : ''}
                `}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.name}</span>}
              </a>
              {isCollapsed && (
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>

       
        <div className="p-4 flex items-center border-t border-gray-900 mt-auto">
          <img
            src={user?.profilePhoto}
            alt="User"
            className="w-10 h-10 object-cover rounded-full border-2 border-white"
          />
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-white font-semibold">{user?.firstName} {user?.lastName}</h1>
              <p className="text-gray-400 text-sm">Farmer</p>
            </div>
          )}
        </div>
      </aside>

    
      <main className={`flex-auto transition-all duration-300 ${isCollapsed ? 'ml-11' : 'ml-56'} `}>
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
