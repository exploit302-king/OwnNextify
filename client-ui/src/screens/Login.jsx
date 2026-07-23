import React, { useState } from 'react';
import axios from 'axios';
import { successToast, errorToast, warningToast } from "../functions/messages";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';



const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const userData = {
    email: email,
    password: password,
  };

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, userData);  // Update URL here

      if (data?.error) {
        errorToast(data.error); // Display backend error
      } else {
        setAuth(data); // Set auth context with the token from backend
        localStorage.setItem("auth", JSON.stringify( data))
        successToast("You are successfully loggedIn "); // Display success message
        navigate("/dashboard")
      }
    } catch (error) {
      console.error(`Login error:`, error);
      warningToast("Failed to login"); // Catch any unexpected errors
    }
  };
  return (
    <div className=' w-full'>
      <div className="py-11 pb-{4.75rem} pt-{0.75rem} sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 text-left bg-white dark:bg-gray-300 rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <h1 className="m-0 text-[32px] font-semibold dark:text-white">
                Login
              </h1>
            </div>
            <form onSubmit={handleLogin}>
              <div className="w-full flex flex-col gap-2">
                <label className="font-semibold text-sm text-gray-400" htmlFor='email' >Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="border rounded-lg px-3 py-2 text-gray-400 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-300" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <div className="max-w-sm">
                  <label className="font-semibold text-gray-400 text-sm" htmlFor='password' >Password</label>
                  <div className="relative">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordVisible ? 'text' : 'password'} className="py-2 ps-4 pe-10 mb-8 block w-full border dark:border-gray-500 outline-none dark:bg-gray-300 rounded-lg text-sm text-gray-400 " placeholder="Enter password" />
                    <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600" >
                      {passwordVisible ? (
                        <svg className="shrink-0 size-3.5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                          <circle cx={12} cy={12} r={3} />
                        </svg>
                      ) : (
                        <svg className="shrink-0 size-3.5" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" >
                          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                          <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                          <line x1={2} x2={22} y1={2} y2={22} />
                        </svg>
                      )}
                    </button>

                  </div>
                  <div className='pb-5 text-right text-white text-md flex items-center justify-end'>
                    <label className='flex items-center text-indigo-500 mr-1'>
                      <input type="checkbox" className='mr-2' />
                      Remind Me
                    </label>
                    <Link className='text-indigo-500 pl-3 ' to="/auth/forgetpassword">Forget Password ?</Link>
                  </div>
                </div>
              </div>
              <div>
                <button className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
                  Login
                </button>
              </div>
              <div>
                <span className='text-white text-md flex items-center pt-5' to="/auth/signup">Don't have an account? <Link to="/signup" className='text-blue-700 ml-1 pl-2 '> Signup</Link> </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
