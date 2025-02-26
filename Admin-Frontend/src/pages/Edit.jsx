import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Edit = () => {
    const req = useParams();
    const cropId = req.cropId;
    const navigate = useNavigate();

    const [cropData, setCropData] = useState("");
    const [name, setName] = useState("");
    const [cropphoto, setPhoto] = useState("");
    const [duration, setDuration] = useState("");
    const [seed, setSeed] = useState("");
    const [State, setState] = useState([]);
    const[soil , setSoil] = useState([]);
    const[nutrition, setNutrition] = useState([]);
    const[water,setWater]  = useState([]);
    const[humidity,setHumidity] = useState("")
    const[rain,setRain] = useState("");
    const[temp,setTemp] = useState("");
    const[harvest,setHarvest] = useState("");
    const[plant,setPlant] = useState("");

    const[price,setPrice] = useState("");
    const[about,setAbout] = useState("");
    const[demand,setDemand] = useState("");

    const aboutCrop = async () => {
        try {
            if(cropData) return;
            const response = await axios.get(import.meta.env.VITE_BASE_URL + `/about/${cropId}`, { withCredentials: true });
            console.log(response?.data?.data);
            
            setCropData(response?.data?.data);
            setName(response?.data?.data?.cropName || "");
            setPhoto(response?.data?.data?.cropPhoto || "");
            setDuration(response?.data?.data?.duration || "");
            setSeed(response?.data?.data?.seedRequired || "");
            setState(response?.data?.data?.state|| []);
            setNutrition(response?.data?.data?.nutrition || []);
            setSoil(response?.data?.data?.soilType || [])
            setWater(response?.data?.data?.waterRequirement || [])
            setRain(response?.data?.data?.optimalConditions?.rainfall || "")
            setHumidity(response?.data?.data?.optimalConditions?.humidity || "")
            setTemp(response?.data?.data?.optimalConditions?.temperature || "")
            setHarvest(response?.data?.data?.season?.harvesting || "")
            setPlant(response?.data?.data?.season?.planting || "")
            setAbout(response?.data?.data?.about || "");
            setPrice(response?.data?.data?.market?.currentPrice || "");
            setDemand(response?.data?.data?.market?.demand || "")
        } catch (error) {
            console.log(error?.response?.data);
        }
    };

    useEffect(() => {
        aboutCrop();
    }, []);


   const editCrop = async()=>{
    try {
        const response = await axios.patch(import.meta.env.VITE_BASE_URL+`/edit/crop/${cropId}`,{
            cropName: name,
            cropPhoto: cropphoto,
            duration: duration,
            seedRequired: seed,
            state: State,
            soilType: soil,
            nutrition: nutrition,
            waterRequirement: water,
            optimalConditions: {
              temperature: temp,
              humidity: humidity,
              rainfall: rain
            },
            season: {
              planting: plant,
              harvesting: harvest
            },
            about: about,
            market: {
              demand: demand,
              currentPrice: price
            }
          },{withCredentials:true});

  
 toast.success('Crop Updated!', {
          position: 'top-right',
          autoClose: 3000,
        });
     
    } catch (error) {
       console.log(error);
         toast.error("Error While Updating Crop", {
                position: 'top-right',
                autoClose: 3000,
              });
    }
   }
   const deleteCrop = async()=>{
    try {
        const response = await axios.delete(import.meta.env.VITE_BASE_URL+`/crop/delete/${cropId}`,{
            withCredentials:true
        })
     
            toast.success("Crop Deleted!",{
             position:"top-right",
             duration:3000   
            })
          
            navigate("/feed")
      
        
    } catch (error) {
        console.log(error);
        toast.error("Error While Deleting Crop!",{
            position:"top-right",
            duration:3000
        })
        
    }
   }

    return (
        <div className='min-h-screen w-full bg-emerald-50 flex'>
            {/** SideBar */}
            <div className='min-w-1/4 flex-auto min-h-screen bg-green-400'></div>

            {/** Edit Section */}
            <div className='max-w-screen flex-auto space-y-4 bg-amber-500 justify-center items-center py-10'>
               <ToastContainer/>
                <div className='flex flex-col mx-14 rounded-2xl hover:scale-101 transition-all transform delay-100 duration-300 bg-blue-100'>
                    <div className='flex flex-col mt-10 '>
                        <div className='flex flex-row ml-20 items-center space-x-8 mx-10 ' >
                            <img src={cropphoto} className='size-50  border-2 border-amber-500 rounded-full hover:scale-102 hover:border-green-300 transition-all transform duration-300' />

                            <div className='flex flex-col space-y-5 bg-gradient-to-br rounded-lg border-2 border-gray-300 hover:shadow-xl p-5 grow  from-emerald-50 to-emerald-100/50  '>
                                <textarea type='text' value={cropphoto} onChange={(e) => setPhoto(e.target.value)} className='placeholder:font-semibold  w-full outline-0 resize focus:outline-1' placeholder='Enter Image URL To Change'></textarea>
                                <div className='flex items-center'>
                                    <label className='text-md font-semibold '>Crop Name: </label>
                                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} className='font-semibold pl-4 w-fit text-lg  outline-0 rounded-sm' placeholder='Enter Crop Name' />
                                </div>
                                <div className='flex items-center'>
                                    <label  className='text-md font-semibold '>Duration:</label>
                                    <input type='text' value={duration} onChange={(e) => setDuration(e.target.value)} className='outline-0 font-semibold pl-3 w-fit rounded-sm' placeholder={`${cropData?.duration} Days`} />
                                </div>
                                <div className='flex'>
                                    <label className='text-md font-semibold '>Seed Requirement(kg/Bigha) :</label>
                                    <input type='text' value={seed} onChange={(e) => setSeed(e.target.value)} className='font-semibold pl-3 w-fit outline-0 rounded-sm' placeholder={`${cropData?.seedRequired}kg/Bigha`} />
                                </div>
                            </div>
                        </div>

                   
                    </div>
                {/** State */}
                <div className="bg-gradient-to-br m-7 from-emerald-50 to-emerald-100/50 p-4 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3">
                    
                    <div className='w-full m-3 '>
                      <p className="text-lg text-emerald-700 font-semibold">States :</p>
                      <textarea className="text-lg  w-full no-underline decoration-0 outline-0 resize-y font-bold text-emerald-800"  value={State} onChange={(e)=>setState(e.target.value)} placeholder="Enter States" > </textarea>
                    </div>
                  </div>
                </div>

                {/**Soil Type and Nutrition  */}
              <div className='flex flex-col gap-6  bg-gradient-to-br hover:drop-shadow-2xl from-emerald-50 to-emerald-100/50 rounded-xl m-7 p-6'>
  <div className='flex gap-4 w-full'>
    <div className='flex flex-col gap-2 w-1/2 hover:bg-emerald-100 p-3 rounded-md transition-all transform duration-100 '>
      <h2 className='text-lg font-medium'>Soil</h2>
      <textarea
        className='w-full text-lg rounded-md p-2 outline-none font-semibold'
        value={soil}
        onChange={(e) => setSoil(e.target.value)}
      ></textarea>
    </div>

    <div className='flex flex-col gap-2 w-1/2  hover:bg-emerald-100 p-3 rounded-md transition-all transform duration-100'>
      <h2 className='text-lg font-medium'>Nutrition</h2>
      <textarea
        className='w-full text-lg rounded-md p-2 outline-none font-semibold'
        value={nutrition}
        onChange={(e) => setNutrition(e.target.value)}
      ></textarea>
    </div>
  </div>
</div>
                {/**Water Humidity Rainfall Temp */}
<div className='flex flex-wrap  space-x-8 mx-8  hover:drop-shadow-2xl  bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-lg ' >
 
 <div className='flex grow gap-4 p-5  '>
 {/**Water */}
 <div className='flex flex-col grow hover:bg-emerald-100 rounded-md p-2 ' >
    <h1 className='font-semibold text-lg p-2'>Water Requirement</h1>
    <textarea className='w-full text-lg font-semibold outline-0 px-2' value={water} onChange={(e)=>setWater(e.target.value)}></textarea>

 </div>
 {/**Temp */} 
 <div className='flex flex-col grow  hover:bg-emerald-100 '>
    <h1 className='font-semibold  text-lg p-2'>Temperature</h1>
    <textarea className='w-full text-lg outline-0 font-semibold px-2' value={temp} onChange={(e)=>setTemp(e.target.value)}></textarea>

 </div>
 {/**Humidity */}
 <div className='flex flex-col grow  hover:bg-emerald-100 '>
    <h1 className='font-semibold text-lg p-2'>Humidity</h1>
    <textarea className='w-full text-lg outline-0 font-semibold px-2' value={humidity} onChange={(e)=>setHumidity(e.target.value)}></textarea>

 </div>
 {/**Rainfall */}
 <div className='flex flex-col grow  hover:bg-emerald-100 '>
    <h1 className='font-semibold text-lg p-2' >Rainfall</h1>
    <textarea className='w-full outline-0  text-lg font-semibold px-2' value={rain} onChange={(e)=>setRain(e.target.value)}></textarea>

 </div>
</div>

</div>

{/**Season Info */}
<div className="flex flex-col hover:drop-shadow-2xl gap-6 mx-10 mt-8 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-md p-4 ">
  <h1 className="text-lg font-semibold">Seasonal Information</h1>
  <div className="flex gap-7 ">
    <div className="flex flex-col gap-2 w-1/2">
      <h2 className="text-lg font-medium">Harvest</h2>
      <textarea
        className="border outline-0 font-semibold p-2  pb-0 rounded-md"
        value={harvest}
        onChange={(e) => setHarvest(e.target.value)}
      ></textarea>
    </div>

    <div className="flex flex-col gap-2 w-1/2">
      <h2 className="text-lg font-medium">Plant</h2>
      <textarea
        className="border p-2 pb-0 font-semibold rounded-md outline-0"
        value={plant}
        onChange={(e) => setPlant(e.target.value)}
      ></textarea>
    </div>
  </div>
</div>

  {/**button */}
  <div className='flex space-x-10 justify-center mt-3 mb-8'>
<button onClick={editCrop} className='py-3 bg-green-500 px-14  text-lg font-semibold text-white rounded-lg  hover:bg-green-600 duration-300 delay-75 transition-all transform hover:scale-103 '>Save Changes</button>
<button onClick={deleteCrop} className='py-3 bg-red-500 px-14  text-lg font-semibold text-white rounded-lg  hover:bg-red-600 duration-300 delay-75 transition-all transform hover:scale-103'>Delete Crop</button>

                </div>
                </div>
              
            </div>
        </div>
    );
}

export default Edit;
