import React, { useState } from 'react';
import { StepBack } from 'lucide-react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const ListCrop = () => {
    const navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [price, setPrice] = useState(0);
    const [cropType, setCropType] = useState([]);
    const [season, setSeason] = useState([]);
    const [quantity, setQty] = useState("");
    const [about, setAbout] = useState("");
    const [demand, setDemand] = useState("");
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    
    
    const cropTypes = ["Vegetable", "Fruit", "Grain", "Pulse", "Spice", "Other"];
    const seasons = ["Spring", "Summer", "Monsoon", "Autumn", "Winter", "Year-round"];

    const handleCropTypeChange = (type) => {
        if (cropType.includes(type)) {
            setCropType(cropType.filter(item => item !== type));
        } else {
            setCropType([...cropType, type]);
        }
    };

    const handleSeasonChange = (seasonName) => {
        if (season.includes(seasonName)) {
            setSeason(season.filter(item => item !== seasonName));
        } else {
            setSeason([...season, seasonName]);
        }
    };

    const listCrop = async (e) => {
        e.preventDefault();
        
        if (!name  || !price || cropType.length === 0 || season.length === 0 || !quantity || !about) {
            alert("Please fill all required fields");
            return;
        }
        
        setLoading(true);
        
        try {
            
            const response = await axios.post(
                import.meta.env.VITE_BASE_URL + "/listCrop",
                
                {
                    cropName:name,
                    cropPhoto:photo,
                    price:price,
                    cropType,
                    season,
                    quantity,
                    about,
                    demand       

                },
                { 
                    withCredentials: true,
                }
            );
            
            alert("Crop listed successfully!");
            
            
        } catch (error) {
            if (error?.response?.status === 401) {
                return navigate('/login');
            }
           // alert("Error listing crop: " + (error?.response?.data || "Unknown error"));
            console.log("Error in API " + error?.response?.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
    
            <nav className="w-full h-16 px-4 flex items-center bg-green-600 text-white shadow-md sticky">
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center gap-2 hover:bg-green-700 p-2 rounded-md transition-colors"
                >
                    <StepBack size={20} />
                    <span>Back</span>
                </button>
                <h1 className="text-xl font-semibold ml-4">List New Crop</h1>
            </nav>
            
          
    { loading? (
        <div className='h-20 flex items-center justify-around my-52'>
            <div className='h-20 w-20 rounded-full bg-green-500   border-8 animate-spin border-t-gray-50 border-b-gray-50' > </div>
        </div>) :    (   <div className="max-w-4xl mx-auto p-4 md:p-6">
                <form onSubmit={listCrop} className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     
                        <div className="space-y-6">
                        
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">
                                    Crop Photo*
                                </label>
                                <img src={photo} className='rounded-full h-36 w-36' />
                                <input type='text' className='outline-1 w-full rounded-sm' required value={photo} onChange={(e)=>setPhoto(e.target.value)} />
                            </div>

                            {/* Crop Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Crop Name*
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter crop name"
                                    required
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Price per unit (₹)*
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter price"
                                    min="0"
                                    required
                                />
                            </div>

                            {/* Quantity */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Available Quantity (kg)*
                                </label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQty(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter available quantity"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Crop Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Crop Type*
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {cropTypes.map((type) => (
                                        <div key={type} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`type-${type}`}
                                                checked={cropType.includes(type)}
                                                onChange={() => handleCropTypeChange(type)}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Season */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Growing Season*
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {seasons.map((seasonName) => (
                                        <div key={seasonName} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`season-${seasonName}`}
                                                checked={season.includes(seasonName)}
                                                onChange={() => handleSeasonChange(seasonName)}
                                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor={`season-${seasonName}`} className="ml-2 text-sm text-gray-700">
                                                {seasonName}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Market Demand */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Market Demand
                                </label>
                                <select
                                    value={demand}
                                    onChange={(e) => setDemand(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Select demand level</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>

                            {/* About/Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    About/Description*
                                </label>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    rows={4}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="Enter details about your crop"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-green-600 text-white py-3 px-4 rounded-md font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50"
                        >
                            {loading ? "Listing Crop..." : "List Crop"}
                        </button>
                    </div>
                </form>
            </div>)}
        </div>
    );
};

export default ListCrop;