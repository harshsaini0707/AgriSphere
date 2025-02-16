import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { addUser } from '../store/UserSlice';

const useValidation = () => {
    const user = useSelector((store)=>store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[User,setUser] =  useState(false);

    const getUser = async() =>{
        try {
            const response = await axios.get(import.meta.env.VITE_BASE_URL+"/profile",{withCredentials:true})
            dispatch(addUser(response?.data?.data));
            setUser(true);
        
        } catch (error) {
            console.log(error.message);
            setUser(false);
            navigate("/login")   
        }
    }

    useEffect(()=>{
        if(!user  || Object.keys(user).length === 0){
            getUser();
        }else{
            setUser(true)
        }
    },[user,dispatch,navigate])

  return User;
}

export default useValidation;