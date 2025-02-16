import { createSlice } from "@reduxjs/toolkit";

const suggestionSlice = createSlice({
  name: "suggestion",
  initialState: { state: "", 
    soil: ""
 },
  reducers: {
    selectState: (state, action) => {
      state.state = action.payload; 
    },
    selectSoil: (state, action) => {
      state.soil = action.payload; 
    },
  },
});

export const { selectState, selectSoil } = suggestionSlice.actions;
export default suggestionSlice.reducer;
