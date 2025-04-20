import React from 'react';
import { Users, MessageSquare, Sprout, ClipboardList, CloudSun, Info, ShoppingCart } from 'lucide-react';
import BgImg from '../assets/2.jpg';
import { useNavigate } from 'react-router';

const services = [
  {
    id: 1,
    title: 'AI Assistant',
    icon: <MessageSquare size={24} />,
    color: 'bg-green-500',
    about: "The AI Assistant in AgriSphere empowers farmers with instant, expert-level guidance. Farmers can receive personalized advice, get solutions to farming challenges, and access accurate, real-time support across a wide range of agricultural topics."
  },
  {
    id: 2,
    title: 'Crop Suggestion',
    icon: <Sprout size={24} />,
    color: 'bg-yellow-500',
    about:
      'The Crop Suggestion feature helps farmers choose the best crops based on their state, location, and soil type. It provides tailored recommendations, ensuring better yield and efficient resource use, empowering farmers to make informed planting decisions.',
  },
  {
    id: 3,
    title: 'Task Management',
    icon: <ClipboardList size={24} />,
    color: 'bg-red-500',
    about:
      'The Task Management feature helps farmers organize daily and weekly activities like planting, watering, fertilizing, and harvesting. It ensures timely completion of tasks, improving productivity and crop health through better planning and reminders.',
  },
  {
    id: 4,
    title: 'Weather Forecast',
    icon: <CloudSun size={24} />,
    color: 'bg-purple-500',
    about:
      'The Weather Forecast feature provides farmers with real-time weather updates and a seven-day forecast. It helps them plan agricultural activities like planting, watering, and harvesting based on accurate temperature, humidity, and rainfall predictions.',
  },
  {
    id: 5,
    title: 'Crop Details',
    icon: <Info size={24} />,
    color: 'bg-teal-500',
    about:
      'Get essential details about different crops, including harvest time, water needs, fertilizer recommendations, seeds, temperature and ideal planting seasons and more.',
  },
  {
    id: 6,
    title: 'Marketplace',
    icon: <ShoppingCart size={24} />,
    color: 'bg-yellow-500',
    about: "The Marketplace in AgriSphere allows farmers to buy and sell agriculture-related products with ease. From seeds and tools to fresh produce and fertilizers, the platform connects local sellers and buyers, helping them trade efficiently and securely."
  }
];

const LandingPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-b from-gray-50 to-green-50">

      <nav className="fixed top-0 w-full shadow-md bg-white/90 backdrop-blur-md z-50">
        <div className="container mx-auto flex items-center justify-between h-16 px-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent tracking-wide">AGRISPHERE</h1>
          <div className="hidden sm:flex space-x-10 text-lg font-medium">
            <a 
              onClick={() => {
                const servicesSection = document.getElementById('services');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-green-500 text-gray-700 transition duration-300 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
              Our Services
            </a>
            <a 
              onClick={() => {
                const servicesSection = document.getElementById('about');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-green-500 text-gray-700 transition duration-300 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
              About Us
            </a>
            <a 
              onClick={() => {
                const servicesSection = document.getElementById('contact');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-green-500 text-gray-700 transition duration-300 border-b-2 border-transparent hover:border-green-500 cursor-pointer">
              Contact Us
            </a>
          </div>
          <div className="sm:flex space-x-4 hidden">
            <button onClick={() => navigate("/login")} className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 font-medium ">
              Login
            </button>
            <button onClick={() => navigate("/signup")} className="px-6 py-3 bg-white text-green-500 border-2 border-green-500 rounded-lg shadow-md hover:bg-green-50 hover:text-green-600 hover:border-green-600 transition duration-300 font-medium">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center h-screen pt-20 overflow-hidden">
        <img src={BgImg} alt="Landing Page" className="absolute top-0 left-0 w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 to-green-900/50"></div>
        <div className="relative text-center text-white z-10 max-w-3xl px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-wider drop-shadow-xl mb-6">
            Welcome to <span className="text-green-400">AGRISPHERE</span>
          </h1>
          <p className="text-xl md:text-2xl mt-6 font-medium drop-shadow-md">Empowering Farmers. Growing the Future.</p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => navigate("/login")} className="px-8 py-4 bg-green-500 text-white rounded-full shadow-xl hover:bg-green-600 transition duration-300 transform hover:scale-105 font-medium">
              Get Started
            </button>
            <button
              onClick={() => {
                const servicesSection = document.getElementById('services');
                servicesSection?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-green-600 transition duration-300 transform hover:scale-105 font-medium">
              Learn More
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-green-900/20 to-transparent"></div>
      </div>

      {/* Services Section */}
      <div id="services" className="container mx-auto py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">Our <span className="text-green-500">Services</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="flex flex-col rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-2 w-full ${service.color}`}></div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg ${service.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl ml-4 font-bold text-gray-800">{service.title}</h3>
                </div>
                <p className="mt-4 text-gray-600 leading-relaxed">{service.about}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;