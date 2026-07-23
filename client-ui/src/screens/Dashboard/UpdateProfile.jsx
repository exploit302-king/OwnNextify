import React, { useState } from 'react';
import { Button } from '@headlessui/react';
import { useAuth } from '../../context/auth';

const UpdateProfile = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    name: auth?.user?.name || '',
    age: auth?.user?.age || '',
    phone: auth?.user?.phone || '',
    email: auth?.user?.email || '',
    address: auth?.user?.address || '',
    company: auth?.user?.company || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Profile Data:', formData);
    setAuth((prev) => ({ ...prev, user: { ...prev.user, ...formData } }));
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex ml-32 py-4 items-center justify-center">
      <div className="w-full max-w-lg py-6 px-8 rounded-lg shadow-md bg-white">
        <h2 className="text-xl font-bold text-purple-600 mb-4 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1 */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>
          </div>
          {/* Row 2 */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>
          </div>
          {/* Row 3 */}
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700 font-bold mb-1" htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-300"
                required
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
