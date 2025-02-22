import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCrop } from "../store/cropSlice";
import { Info } from "lucide-react";
import { useNavigate } from "react-router";
import { selectSoil, selectState } from "../store/suggestionSlice";
import useValidation from "../hooks/useValidation";

const Suggestion = () => {
  useValidation();
  const statee = useSelector((store) => store.user.State || "");
  const cropFeed = useSelector((store) => store.crop);
  const selectedSoil = useSelector((store) => store.suggestion.soil || " "); 
  const selectedState = useSelector((store) => store.suggestion.state || ""); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const [STATE, setState] = useState(selectedState==""? statee :selectedState );
  const [SOIL, setSoil] = useState(selectedSoil || "");
  const[loading,setLoading]  = useState(true);

  useEffect(() => {
    if (SOIL) dispatch(selectSoil(SOIL));
  }, [SOIL, dispatch]);

  useEffect(() => {
    if (STATE) dispatch(selectState(STATE));
  }, [STATE, dispatch]);

 

  useEffect(() => {
    const fetchCrops = async () => {
      if (cropFeed.length > 0){
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL+"/userFeed", {
          withCredentials: true,
        });
        dispatch(addCrop(response?.data?.data));
      } catch (error) {
        console.error("Error fetching crops:", error.message);
      }finally{
        setLoading(false)
      }
    };
    fetchCrops();
  }, [dispatch, cropFeed]);

  const plantCrop = async (cropId) => {
    try {
      if (!cropId) return;
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL+`/plantCrop/${cropId}`,
        { cropId },
        { withCredentials: true }
      );
      console.log("Planted Crop:", response?.data?.data);
    } catch (error) {
      console.error("Error planting crop:", error.message);
    }
  };

  const filteredCrops = cropFeed.filter((crop) => {
    const selectedStateLower = STATE.trim().toLowerCase();
    const cropStates = crop.state.map((s) => s.trim().toLowerCase());
    const selectedSoilLower = SOIL.trim().toLowerCase();
    const cropSoilTypes = crop.soilType.map((s) => s.trim().toLowerCase());

    const stateMatches = STATE === "" || cropStates.includes(selectedStateLower);
    const soilMatches = SOIL === "" || cropSoilTypes.includes(selectedSoilLower);

    return stateMatches || soilMatches;
  });

  return(
    <div className="flex min-h-screen bg-gradient-to-br from-[#0f766e] via-[#22c55e] to-[#4ade80]">
      <Dashboard />

    {loading ? (
    <div className="flex justify-center max-w-5xl mx-auto px-8 py-16">
    <div className="h-36 w-36  mt-44 border-2 border-t-transparent   border-white rounded-full animate-spin duration-100 "></div>
  </div>
  
    ) : (<div className="max-w-5xl mx-auto px-8 py-18">
        {/* Select Form */}
        <form>
          <select value={STATE} onChange={(e) => setState(e.target.value)}>
          <option value="">All State / Union Territory</option>
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
  <option value="Lakshadweep">Lakshadweep</option>
  <option value="Delhi">Delhi</option>
  <option value="Puducherry">Puducherry</option>
  <option value="Ladakh">Ladakh</option>
  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
          </select>

          <select value={SOIL} onChange={(e) => setSoil(e.target.value)}>
            <option value="">Select Soil Type</option>
            <option value="Alluvial">Alluvial</option>
            <option value="Black">Black</option>
            <option value="Red and Yellow">Red and Yellow</option>
            <option value="Laterite">Laterite</option>
            <option value="Arid">Arid</option>
            <option value="Saline">Saline</option>
            <option value="Forest">Forest</option>
          </select>
        </form>

        {/* Display Filtered Crops */}
        {filteredCrops ? (
          filteredCrops.map((crop) => (
            <div
              key={crop._id}
              className="mb-6 border-gray-300 border-2 rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 shadow-xl bg-gray-100 w-full"
            >
              <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-8">
                {/* Image Section */}
                <div className="flex-shrink-0">
                  <img
                    src={crop.cropPhoto}
                    alt={crop.cropName}
                    className="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-2 border-gray-800 shadow-md hover:border-gray-900 transition-all duration-300"
                  />
                </div>

                {/* Crop Details */}
                <div className="flex-grow space-y-3 text-center md:text-left">
                  <h2 className="text-2xl md:text-3xl font-semibold text-black tracking-wide">
                    {crop.cropName}
                  </h2>
                  <p className="text-lg text-gray-700">
                    <span className="text-gray-600 font-medium">Duration:</span>{" "}
                    {crop.duration} days
                  </p>
                  <p className="text-lg text-gray-700">
                    <span className="text-gray-600 font-medium">States:</span>{" "}
                    {crop.state.join(", ")}
                  </p>
                  <p className="text-md text-gray-700">
                    <span className="text-gray-600 font-medium">About:</span>{" "}
                    {crop.about}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-5 mt-5 md:ml-8">
                  <button
                    onClick={() => navigate(`/aboutCrop/${crop._id}`)}
                    className="px-7 py-2.5 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <Info className="inline mb-1" /> About
                  </button>
                  <button
                    onClick={() => plantCrop(crop._id)}
                    className="px-7 py-2.5 bg-green-600 text-white rounded-lg font-medium text-lg hover:bg-green-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <span className="text-xl">🌱</span> Plant
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center mt-10 text-xl">
            No crops found for the selected criteria.
          </p>
        )}
      </div>)}
    </div>
  );
};

export default Suggestion;
