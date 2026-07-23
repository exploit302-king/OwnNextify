import React, { useState } from 'react';
import axios from 'axios';
import { successToast, errorToast, warningToast } from "../../../functions/messages";
import { Link } from 'react-router-dom';
import { Button } from '@headlessui/react';
const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleforgetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/forget-password`, { email });
      const { data } = response;

      if (data?.error) {
        errorToast(data.error);
      } else {
        successToast(data.message);
      }
    } catch (error) {
      console.error(`Something went wrong:`, error.message);
      warningToast(error.error);
    }

  };
  return (
    <div className=' w-full'>
      <div className="py-11 pb-{4.75rem} pt-{0.75rem} sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-10 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          {/* <div className="flex flex-col justify-center items-center h-full select-none"> */}
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <h1 className="m-0 text-[32px] font-semibold dark:text-white">
              Forget Password
            </h1>
          </div>
          <form onSubmit={handleforgetPassword}>
            <div className="w-full flex mt-10 flex-col gap-2">
              <label className="font-semibold text-sm text-gray-400" htmlFor='email' >Email</label>
              <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="border rounded-lg px-3 py-2 text-gray-400 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900" />
            </div>
            <div>
              <button className="py-2 mt-5 px-10 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none">
                Send email
              </button>
            </div>
            <div>
              <span className='dark:text-white  text-black text-md flex items-center pt-5' to="/auth/signup">
                Don't have an account?
                <Link to="/signup" className='text-blue-700 ml-1 pl-2 '> Signup</Link>
              </span>
            </div>
            <div>
              <span className='dark:text-white  text-black text-md flex items-center pt-5' to="/auth/signup">
                Already have an account?
                <Link to="/login" className='text-blue-700 ml-1 pl-2 '> Login</Link>
              </span>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
