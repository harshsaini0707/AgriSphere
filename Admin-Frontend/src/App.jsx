import React from "react"
import {BrowserRouter , Route ,Routes } from "react-router-dom"
import "./index.css"
import Login from "./pages/Login"
function App() {
  

  return (
   <>
   <BrowserRouter basename="/">
   <Routes>
    <Route path="/admin/login" element={<Login/>} /> 
   </Routes>

   </BrowserRouter>

   </>
  )
}

export default App
