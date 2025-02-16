import "./index.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Singup from "./pages/Singup"
import Login from "./pages/Login"
import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux";
import Store from "./store/Store";
import Profile from "./pages/Profile";
import Suggestion from "./pages/Suggestion";
import Mycrop from "./pages/Mycrop";
import HarvestedCrop from "./pages/HarvestedCrop";
import AboutCrop from "./pages/AboutCrop";
import Task from "./pages/Task";
import UserHome from "./pages/UserHome";


function App() {

  return (
   <>
   <Provider store={Store}>
  <BrowserRouter basename="/">
  <Routes>
 
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/login" element={<Login/>}  />
    <Route path="/signup"  element={<Singup/>} />
    <Route path="/profile" element={<Profile/>} />
    <Route path="/suggestion" element={<Suggestion/>} />
    <Route path="/mycrop" element={<Mycrop/>} />
    <Route path="/harvestedCrop" element={<HarvestedCrop/>} />
    <Route path="/aboutCrop/:cropId" element={<AboutCrop/>} />4
    <Route path="/task" element={<Task/>} />
    <Route path="/userHome" element={<UserHome/>} />
   
  </Routes>
  </BrowserRouter>
  </Provider>
   </>
  )
}

export default App
