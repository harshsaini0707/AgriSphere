import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SideBar from '../components/SideBar';

const AddCrop = () => {
    const [name, setName] = useState("");
    const [cropphoto, setPhoto] = useState("");
    const [duration, setDuration] = useState("");
    const [seed, setSeed] = useState("");
    const [state, setState] = useState("");
    const [soil, setSoil] = useState("");
    const [nutrition, setNutrition] = useState("");
    const [water, setWater] = useState("");
    const [humidity, setHumidity] = useState("");
    const [rain, setRain] = useState("");
    const [temp, setTemp] = useState("");
    const [harvest, setHarvest] = useState("");
    const [plant, setPlant] = useState("");
    const [price, setPrice] = useState("");
    const [about, setAbout] = useState("");
    const [demand, setDemand] = useState("");

    const addCrop = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/add/crop`, {
                cropName: name,
                cropPhoto: cropphoto,
                duration: Number(duration),
                seedRequired: Number(seed),
                state: state.split(','),
                soilType: soil.split(','),
                nutrition: nutrition.split(','),
                waterRequirement: water.split(','),
                humidity,
                rainfall: rain,
                temperature: temp,
                harvesting: harvest,
                planting: plant,
                about,
                demand,
                currentPrice: Number(price)
            }, { withCredentials: true });

            if (response) {
                toast.success('Crop Added Successfully!', { position: 'top-right', autoClose: 3000 });
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error While Adding Crop", { position: 'top-right', autoClose: 3000 });
        }
    };

    return (
        <div className='min-h-screen w-full bg-amber-500 flex'>
          <SideBar/>
            <div className='min-w-screen flex-auto space-y-4 bg-amber-500 justify-center items-center py-10'>
                <div className='flex flex-col font-semibold space-y-4 mx-14 rounded-2xl bg-blue-100 p-5'>
           <div className='flex space-x-2'>
           <label>Crop Name :</label>
           <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Crop Name' />
           </div>
           <div className='flex space-x-2'>
                    <label >Crop Photo URL : </label>
                    <textarea type='text' className="resize grow" value={cropphoto} onChange={(e) => setPhoto(e.target.value)} placeholder='Crop Photo URL'></textarea>
                    </div>

                    <div className='flex space-x-2'>
                      <label >Duration : </label>
                    <input type='number' min={0} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder='Duration (days)' />
                    </div>

                    <div className='flex space-x-2'> 
                      <label >Seed Requirement : </label>
                    <input type='Number' min={0} value={seed} onChange={(e) => setSeed(e.target.value)} placeholder='Seed Required' />
                  </div>

                  <div className='flex space-x-2 '> 
                    <label >States: </label>
                    <textarea value={state} className='grow' onChange={(e) => setState(e.target.value)} placeholder='States (comma-separated)' />
                    </div>
                    <div className='flex space-x-2'> 
                      <label >Soils : </label>
                    <textarea className='grow' value={soil} onChange={(e) => setSoil(e.target.value)} placeholder='Soil Types (comma-separated)' />
                    </div>   

                    <div className='flex space-x-2'>  
                    <label>Nutrition :</label>              
                    <textarea className='grow' value={nutrition} onChange={(e) => setNutrition(e.target.value)} placeholder='Nutrition (comma-separated)' />
                  </div>

                  <div className='flex space-x-2'> 
                    <label>Water Requirement : </label>
                    <textarea className='grow' value={water} onChange={(e) => setWater(e.target.value)} placeholder='Water Requirements (comma-separated)' />
                   </div>

                   <div className='flex space-x-2'> 
                    <label >Humidity : </label>
                    <input type='text' value={humidity} onChange={(e) => setHumidity(e.target.value)} placeholder='Humidity' />
                    </div>
                    <div className='flex space-x-2'> 
                      <label>Rainfall</label>
                    <input type='text' value={rain} onChange={(e) => setRain(e.target.value)} placeholder='Rainfall' />
                    </div>

                    <div className='flex space-x-2'>
                      <label>Temperature : </label> 
                    <input type='text' value={temp} onChange={(e) => setTemp(e.target.value)} placeholder='Temperature' />
                   </div>
                   <div className='flex space-x-2'> 
                    <label >Harvest  : </label>
                    <input type='text' value={harvest} onChange={(e) => setHarvest(e.target.value)} placeholder='Harvesting Season' />
                   </div>

                   <div className='flex space-x-2'> 
                    <label >Planting : </label>
                    <input type='text' value={plant} onChange={(e) => setPlant(e.target.value)} placeholder='Planting Season' />
                    </div>

                    <div className='flex space-x-2'> 
                    <label> About : </label>
                    <textarea value={about} className='grow' onChange={(e) => setAbout(e.target.value)} placeholder='About the Crop' />
                    </div>

                    <div className='flex space-x-2'> 
                    <label>Market Demand : </label>
                    <input type='text' value={demand} onChange={(e) => setDemand(e.target.value)} placeholder='Market Demand' />
                    </div>
                    <div className='flex space-x-2'> 
                    <label >Current Market Price  :</label>
                    <input type='number' min={0} value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Current Price' />
                    </div>
                    
                    <div className='flex justify-center items-center mt-3 '>
                    <button onClick={addCrop} className='bg-green-500  hover:scale-103 duration-300 text-white px-40 py-3 rounded-lg'>Add Crop</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCrop;
