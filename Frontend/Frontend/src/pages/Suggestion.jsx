import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCrop } from "../store/cropSlice";
import { Info, Leaf, Filter } from "lucide-react";
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
  const [selectedCrop, setSelectedCrop] = useState(null);

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
    <Dashboard>
    <div className="flex min-h-screen  bg-gray-300">
      <div className="flex-1">
        <div className="max-w-6xl mx-auto py-8 px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Crop Suggestions</h1>
            <p className="text-gray-600">Find the perfect crops for your soil and region</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="h-16 w-16 border-4 border-t-green-500 border-green-200 rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              
              <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="flex items-center mb-4">
                  <Filter size={20} className="text-green-600 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-800">Filter Crops</h2>
                </div>
                <form className="flex flex-col md:flex-row gap-4">
                  <select
                    value={STATE}
                    onChange={(e) => setState(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 shadow-sm"
                  >
                    <option value="">All State / Union Territory</option>
                    {[
                      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                      "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                      "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                      "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir"
                    ].map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>

                  <select
                    value={SOIL}
                    onChange={(e) => setSoil(e.target.value)}
                    className="flex-1 p-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-800 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 shadow-sm"
                  >
                    <option value="">Select Soil Type</option>
                    {["Alluvial", "Black", "Red", "Yellow", "Laterite", "Arid", "Saline", "Forest"].map(
                      (soil) => (
                        <option key={soil} value={soil}>
                          {soil}
                        </option>
                      )
                    )}
                  </select>
                </form>
              </div>

              {filteredCrops.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                  {filteredCrops.map((crop) => (
                    <div
                      key={crop._id}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-48 lg:w-56 relative overflow-hidden">
                          <div className="absolute top-0 left-0 bg-green-500 text-white px-3 py-1 rounded-br-lg font-medium z-10">
                            {crop.duration} days
                          </div>
                          <img
                            src={crop.cropPhoto}
                            alt={crop.cropName}
                            className="w-full h-full object-cover md:h-48 lg:h-56"
                          />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <h2 className="text-2xl font-bold text-gray-800 mb-2">{crop.cropName}</h2>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {SOIL === "" && crop.soilType.map((soil, index) => (
                                  <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                                    {soil}
                                  </span>
                                ))}
                                {STATE === "" && crop.state.slice(0, 3).map((state, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    {state}
                                  </span>
                                ))}
                                {STATE === "" && crop.state.length > 3 && (
                                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                    +{crop.state.length - 3} more
                                  </span>
                                )}
                              </div>
                              
                              <p className="text-gray-600 mb-4 line-clamp-2">{crop.about}</p>
                              
                              <div className="text-sm text-gray-500">
                                Seeds required: ~{crop.seedRequired} kg per Bigha
                              </div>
                            </div>
                            
                            <div className="flex md:flex-col gap-3 mt-4 md:mt-0">
                              <button
                                onClick={() => navigate(`/aboutCrop/${crop._id}`)}
                                className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm"
                              >
                                <Info size={18} className="mr-2" /> Details
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedCrop(crop);
                                  setArea(true);
                                }}
                                className="flex items-center justify-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 shadow-sm"
                              >
                                <Leaf size={18} className="mr-2" /> Plant
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-xl shadow-md text-center">
                  <div className="text-5xl mb-4">🌱</div>
                  <p className="text-gray-600 text-lg mb-2">No crops found for the selected criteria.</p>
                  <p className="text-gray-500">Try adjusting your filters for more results.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {area && selectedCrop && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-96 border border-gray-100">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-800">Enter Planting Area</h2>
            
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Leaf size={30} className="text-green-600" />
              </div>
            </div>
            
            <label className="block text-sm font-medium text-gray-700 mb-2">Area (in Bigha)</label>
            <input
              type="number"
              min="0"
              placeholder="Enter area"
              value={inputArea}
              onChange={(e) => setInputArea(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 mb-4"
            />
            
            <div className="bg-green-50 p-3 rounded-lg mb-6">
              <h3 className="font-medium text-green-800">
                Seed Required: <span className="font-bold">~{selectedCrop.seedRequired * inputArea} kg</span> for {inputArea} Bigha
              </h3>
            </div>
            
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setArea(false)}
                className="flex-1 bg-gray-100 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  plantCrop(selectedCrop._id);
                  setArea(false);
                }}
                className="flex-1 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Dashboard>
  );
};

export default Suggestion;