// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create context
export const AppContext = createContext();

// Create provider
export const AppContextProvider = ({ children }) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [user, setUser] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  const loadUserProfileData = async () => {
    try {
        const { data } = await axios.get(backendUrl + '/api/auth/get-profile', { headers: { Authorization: `Bearer ${token}` } })

        if (data.success) {
            setUser(data.user)
        } else {
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else{
           setUser(false);
        }
    }, [token])

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken, backendUrl, loadUserProfileData }}>
      {children}
    </AppContext.Provider>
  );
};