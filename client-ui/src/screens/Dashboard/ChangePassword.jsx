import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { successToast } from '../../functions/messages';
import apis from '../../config/apis'

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false); // Toggle for old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // Toggle for new password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword) {
      setMessage('Please enter your old password');
      return;
    }
    if (!newPassword) {
      setMessage('Please enter your new password');
      return;
    }

    try {
      // Make API call to change password
      const response = await axios.post(`${apis[0]}/changepassword`, {
        email,
        oldPassword,
        newPassword,
      });

      if (response.data.message) {
        setMessage(response.data.message);
        return;
      } else {
        successToast('Password changed successfully');
        navigate('/login');
      }
    } catch (error) {
      setMessage('Server error. Could not change password');
      console.log(error.message)
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="max-w-md p-8 ml-10 bg-gray-200 mr-24 w-[500px] rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-900 mb-6">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? 'text' : 'password'}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your old password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showOldPassword ? <FiEye className='text-red-700' /> : <FiEyeOff className='text-red-700' />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showNewPassword ? <FiEye className='text-red-700' /> : <FiEyeOff className='text-red-700' />}
              </button>
            </div>
          </div>

          <button
            type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition" >
            Change Password
          </button>
        </form>
        {message && (
          <p className={`mt-4 text-center text-sm font-semibold ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`} >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;