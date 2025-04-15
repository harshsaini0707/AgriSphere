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

  const [area, setArea] = useState(false);
  const [inputArea, setInputArea] = useState(1);
  const [selectedCrop, setSelectedCrop] = useState(null); // Track selected crop

  const [STATE, setState] = useState(selectedState === "" ? statee : selectedState);
  const [SOIL, setSoil] = useState(selectedSoil || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (SOIL) dispatch(selectSoil(SOIL));
  }, [SOIL, dispatch]);

  useEffect(() => {
    if (STATE) dispatch(selectState(STATE));
  }, [STATE, dispatch]);

  useEffect(() => {
    const fetchCrops = async () => {
      if (cropFeed.length > 0) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(import.meta.env.VITE_BASE_URL + "/userFeed", {
          withCredentials: true,
        });
        dispatch(addCrop(response?.data?.data));
      } catch (error) {
        console.error("Error fetching crops:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, [dispatch, cropFeed]);

  const plantCrop = async (cropId) => {
    try {
      if (!cropId) return;
      const response = await axios.post(
        import.meta.env.VITE_BASE_URL + `/plantCrop/${cropId}`,
        { cropId, area: inputArea },
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

    return stateMatches && soilMatches;
  });

  return (
    <div className="flex min-h-screen bg-[#2c2c2c]">
      <Dashboard />

      {loading ? (
        <div className="flex justify-center max-w-5xl mx-auto px-8 py-16">
          <div className="h-36 w-36 mt-44 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto py-10 ">
          {/* Select Form */}
          <form className="flex gap-4 cursor-pointer ml-10 justify-center mb-8 ">
            <select
              value={STATE}
              onChange={(e) => setState(e.target.value)}
              className="p-3 rounded-lg bg-white/70  hover:cursor-pointer   text-black focus:ring-0  shadow-md "
            >
              <option className="border-0 cursor-pointer  bg-gray-300 font-mono" value="">All State / Union Territory</option>
              {[
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
              ].map((state) => (
                <option  className="border-0 cursor-pointer  bg-gray-300 font-mono" key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              value={SOIL}
              onChange={(e) => setSoil(e.target.value)}
              className="p-3  cursor-pointer  rounded-lg bg-white/70  text-black shadow-md focus:ring-2 focus:ring-green-500"
            >
              <option value="" className="border-0 cursor-pointer  bg-gray-300 font-mono">Select Soil Type</option>
              {["Alluvial", "Black", "Red" ,"Yellow", "Laterite", "Arid", "Saline", "Forest"].map(
                (soil) => (
                  <option className=" cursor-pointer  border-0 bg-gray-300 font-mono" key={soil} value={soil}>
                    {soil}
                  </option>
                )
              )}
            </select>
          </form>

          {/* Display Filtered Crops */}
          {filteredCrops.length > 0 ? (
            filteredCrops.map((crop) => (
              <div
                key={crop._id}
                className="mb-6 px-3 border-2 ml-28 border-gray-400 rounded-xl overflow-hidden shadow-lg bg-white/73 hover:shadow-2xl transition-transform duration-300 transform hover:scale-102"
              >
                <div className="p-6 flex flex-col md:flex-row items-center gap-8">
                  <img
                    src={crop.cropPhoto}
                    alt={crop.cropName}
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-800 shadow-md"
                  />
                  <div className="text-center md:text-left w-2/3 space-y-3">
                    <h2 className="text-3xl font-bold text-gray-900">{crop.cropName}</h2>
                    <p className="text-lg text-gray-700">Duration: {crop.duration} days</p>
                    <p className="text-lg text-gray-700 ">States: {crop.state.join(", ")}</p>
                    <p className="text-gray-600 truncate ">About: {crop.about}</p>
                  </div>
                  <div className="flex flex-col gap-4 ">
                    <button
                      onClick={() => navigate(`/aboutCrop/${crop._id}`)}
                      className="bg-blue-600 flex cursor-pointer text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition hover:scale-103 duration-300"
                    >
                      <Info className="inline-block mr-2 " /> About
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCrop(crop);
                        setArea(true);
                      }}
                      className="bg-green-600 cursor-pointer text-white  py-3 rounded-lg hover:bg-green-700 transition hover:scale-103 duration-300"
                    >
                      🌱 Plant
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
        </div>
      )}

      {/* Planting Area Modal */}
      {area && selectedCrop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4 text-center">Enter Planting Area</h2>
            <input
              type="Number"
              min="0"
              placeholder="Area (in Bigha)"
              value={inputArea}
              onChange={(e) => setInputArea(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <h1 className="mt-2 font-semibold">
              Seed Required: ~{selectedCrop.seedRequired * inputArea}kg in {inputArea} Bigha
            </h1>
            <div className="flex justify-between mt-4">
              <button onClick={() => setArea(false)} className="bg-red-500  cursor-pointer text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button
                onClick={() => {
                  plantCrop(selectedCrop._id);
                  setArea(false);
                }}
                className="bg-green-500  cursor-pointer text-white px-4 py-2 rounded-lg"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Suggestion;
