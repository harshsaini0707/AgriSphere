import {configureStore} from "@reduxjs/toolkit"
import UserReducer from "./UserSlice"
import CropReducer from "./cropSlice"
import suggestionReducer from "./suggestionSlice"

const Store = configureStore({

    reducer:{
        user:UserReducer,
        crop:CropReducer,
        suggestion:suggestionReducer
    },
})

export default Store;