import React from 'react';
import { Users, MessageSquare, Sprout, ClipboardList, CloudSun, Info } from 'lucide-react'; // Lucide icons
import BgImg from '../assets/2.jpg';
import { useNavigate } from 'react-router';

const services = [
  {
    id: 1,
    title: 'Community',
    icon: <Users size={24} />,
    color: 'bg-blue-500',
    about:
      'The Community feature in AGRISPHERE lets farmers create and join groups, connect with farmers worldwide, and share knowledge and experiences. It’s a space for collaboration, where farmers discuss techniques, solve challenges, and grow together through collective wisdom.',
  },
  {
    id: 2,
    title: 'Assistant',
    icon: <MessageSquare size={24} />,
    color: 'bg-green-500',
    about:"The Assistant feature in AGRISPHERE connects farmers with expert mentors for guidance. Farmers can upload photos of crops, and the assistant provides tailored advice based on the images. It also helps solve a wide range of farming-related issues, offering quick and accurate support."},
  {
    id: 3,
    title: 'Crop Suggestion',
    icon: <Sprout size={24} />,
    color: 'bg-yellow-500',
    about:
      'The Crop Suggestion feature helps farmers choose the best crops based on their state, location, and soil type. It provides tailored recommendations, ensuring better yield and efficient resource use, empowering farmers to make informed planting decisions.',
  },
  {
    id: 4,
    title: 'Task Management',
    icon: <ClipboardList size={24} />,
    color: 'bg-red-500',
    about:
      'The Task Management feature helps farmers organize daily and weekly activities like planting, watering, fertilizing, and harvesting. It ensures timely completion of tasks, improving productivity and crop health through better planning and reminders.',
  },
  {
    id: 5,
    title: 'Weather Forecast',
    icon: <CloudSun size={24} />,
    color: 'bg-purple-500',
    about:
      'The Weather Forecast feature provides farmers with real-time weather updates and a seven-day forecast. It helps them plan agricultural activities like planting, watering, and harvesting based on accurate temperature, humidity, and rainfall predictions.',
  },
  {
    id: 6,
    title: 'Crop Details',
    icon: <Info size={24} />,
    color: 'bg-teal-500',
    about:
      'Get essential details about different crops, including harvest time, water needs, fertilizer recommendations,seeds ,temprature and ideal planting seasons and more.',
  },
];

const LandingPage = () => {

    const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="fixed top-0 w-full  shadow-lg backdrop-blur-3xl z-50">
        <div className="flex items-center justify-between h-16 px-8">
          <h1  className="text-2xl font-bold text-green-500 tracking-wide">AGRISPHERE</h1>
          <div className="hidden sm:flex space-x-8 text-lg font-medium text-gray-800">
            <a 
                onClick={() => {
                    const servicesSection = document.getElementById('services');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }} 
            className="hover:text-green-500  text-cyan-500 transition">
              Our Services
            </a>
            <a 
                onClick={() => {
                    const servicesSection = document.getElementById('about');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }} 
            className="hover:text-green-500  text-cyan-500  transition">
              About Us
            </a>
            <a 
                onClick={() => {
                    const servicesSection = document.getElementById('contact');
                    servicesSection?.scrollIntoView({ behavior: 'smooth' });
                  }} 
            className="hover:text-green-500  text-cyan-500 transition">
              Contact Us
            </a>
          </div>
          <div className="sm:flex space-x-4">
            <button  onClick={()=>navigate("/login")} className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
              Login
            </button>
            <button onClick={()=>navigate("/signup")}  className="px-4 py-2 bg-white text-green-500 border-2 border-green-500 rounded-lg shadow-md hover:bg-green-500 hover:text-white transition">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen pt-12">
        <img src={BgImg} alt="Landing Page" className="absolute top-0 left-0 w-full h-full object-cover opacity-90" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-5xl font-extrabold tracking-wider drop-shadow-lg">Welcome to AGRISPHERE</h1>
          <p className="text-xl mt-4 font-medium drop-shadow-md">Empowering Farmers. Growing the Future.</p>
          <div className="mt-8 space-x-4">
            <button onClick={()=>navigate("/login")} className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition">
              Get Started
            </button>
            <button
             onClick={() => {
          const servicesSection = document.getElementById('services');
          servicesSection?.scrollIntoView({ behavior: 'smooth' });
        }} 
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-500 transition">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      
      <div id="services" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-13 bg-gray-200">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col p-8 rounded-lg shadow-lg bg-white/50 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center">
              <div className={`p-4 rounded-full ${service.color} text-white`}>
                {service.icon}
              </div>
              <h1 className="text-2xl ml-4 font-bold text-gray-800">{service.title}</h1>
            </div>
            <p className="mt-4 font-normal text-gray-700">{service.about}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
