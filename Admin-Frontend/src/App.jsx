import React from "react"
import {BrowserRouter , Route ,Routes } from "react-router-dom"
import "./index.css"
import Login from "./pages/Login"
import AddCrop from "./pages/AddCrop"
import Feed from "./pages/Feed"
import Edit from "./pages/Edit"
function App() {
  

  return (
   <>
   <BrowserRouter >
   <Routes>
    <Route path="/" element={<Login/>} />
    <Route path="/addCrop" element={<AddCrop/>} /> 
    <Route path="/feed" element={<Feed/>} />
    <Route path="/Edit/:cropId" element={<Edit/> } />
   </Routes>
   </BrowserRouter>

   </>
  )
}

export default App
