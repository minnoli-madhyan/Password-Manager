import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext';

const Login = () => {

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const [state,setState] = useState('Sign Up')
  const location = useLocation();
  useEffect(() => {
      if (location.state?.action === 'Login') {
        setState('Login');
      } else {
        setState('Sign Up');
      }
  }, [location.state]);

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')
  const [otp, setOtp] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (token) navigate('/');
  }, [token, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === "Sign Up") {
        // Sign Up API Call
        const { data } = await axios.post(`${backendUrl}/api/auth/register`, { 
          name, 
          email, 
          password
        });

        if (data.success) {
          toast.success("Account created successfully! Please log in.");
          setState("Login"); // Switch to login mode after successful signup
        } else {
            toast.error(data.message);
        }
      } else {
        // Login API Call
        const { data } = await axios.post(`${backendUrl}/api/auth/login`, { 
          email, 
          password 
        });

        if (data.success) {
          // localStorage.setItem("token", data.token);
          // setToken(data.token);
          // navigate('/'); // Redirect to home page after login
          setShowOtpBox(true);  // Show OTP input box
        } else {
            toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const verifyOtp = async () => {
    try {
      // Verify OTP entered by the user
      const response = await axios.post(`${backendUrl}/api/auth/verify-otp`, { email, otp });
      if (response.data.success) {
        // OTP verified, redirect or login
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        toast.success('Login successful');
        navigate('/'); // Redirect to home page after login
      } else {
        setErrorMessage('Invalid or expired OTP');
      }
    } catch (error) {
      setErrorMessage('Error verifying OTP');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-h-screen flex items-center justify-center px-4 py-16 space-y-5">
      <div className="bg-[#f4f6ff] shadow-2xl rounded-2xl p-12 w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{state === 'Sign Up' ? "Register" : "Login"}</h2>
        {
          state === "Sign Up" && 
            <div className="mb-6">
              <label htmlFor="name" className="block mb-1 text-gray-600 leading-relaxed"> Name: </label>
              <input 
                type="text" 
                id="name" 
                placeholder="Full Name" 
                onChange={(e)=>setName(e.target.value)}
                value={name}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </div>
        }
        <div className="mb-6">
          <label htmlFor="email" className="block mb-1 text-gray-600 leading-relaxed"> Email: </label>
          <input 
            type="email" 
            id="email" 
            placeholder="Email id" 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            required />
        </div>
        <div className="mb-6">
          <label htmlFor="pass" className="block mb-1 text-gray-600 leading-relaxed"> Password: </label>
          <input 
            type="password" 
            id="pass" 
            placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required />
        </div>
        <button type='submit' className="w-full bg-[#273f4f] text-[#fff2f2] py-2 rounded-md hover:bg-[#507687] transition duration-200">{state === 'Sign Up' ? "Register" : "Login"}</button>

        <p className="text-center text-sm mt-4">
          {state === 'Sign Up' ? (
            <>Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => setState('Login')}>Login</span></>
          ) : (
            <>New here? <span className="text-blue-500 cursor-pointer" onClick={() => setState('Sign Up')}>Register</span></>
          )}
        </p>
        {showOtpBox && (
          <div className="mt-4 space-y-2">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              Verify OTP
            </button>
          </div>
        )}
        {errorMessage && <p>{errorMessage}</p>}

      </div>
    </form>
  );
};

export default Login;
