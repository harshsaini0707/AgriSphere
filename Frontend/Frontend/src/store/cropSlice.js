import { createSlice } from "@reduxjs/toolkit";

const cropSlice = createSlice({
    name:"crop",
    initialState:[],
    reducers:{
        addCrop:(state,action)=>{
            return action.payload
        }
    }

})
export const{addCrop} = cropSlice.actions;
export default cropSlice.reducer;