import { Button } from '@headlessui/react';
import React from 'react';
import user from '../../images/No_user.jpg';
import { useAuth } from '../../context/auth';

const Profile = () => {
  const [auth] = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row max-w-full min-h-screen mx-auto p-6 shadow-lg rounded-lg">
      <div className="w-full md:w-1/2 p-4">
        <h1 className="text-3xl font-bold text-[purple]">Profile</h1>
        <div className="text-black">
          <ul className="mt-2 font-bold space-y-2">
            <li className="text-yellow-600">
              <strong className="text-[red]">Role: </strong>
              {auth?.user?.isAdmin ? 'Admin' : 'User'}
            </li>
            <li className="text-yellow-600">
              <strong className="text-blue-600">Name:</strong> {auth?.user?.name}
            </li>
            <li className="text-yellow-600">
              <strong className="text-[blue]">Age:</strong> {auth?.user?.age}
            </li>
            <li className="text-yellow-600">
              <strong className="text-orange-500">Phone:</strong> {auth?.user?.phone}
            </li>
            <li className="text-yellow-600">
              <strong className="text-red-700">Email:</strong> {auth?.user?.email}
            </li>
            <li className="text-yellow-600">
              <strong className="text-[gray]">Location:</strong> {auth?.user?.address}
            </li>
            <li className="text-yellow-600">
              <strong className="text-[purple]">Company:</strong> {auth?.user?.company}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full md:w-3/4 p-4 bg-gray-200 shadow-2xl text-black rounded-lg">
        <div className="flex items-center mb-4">
          <img
            src={auth?.user?.profileImage || user}
            alt="Profile"
            className="rounded-full border-2 h-[200px] w-[200px] border-black mr-4"
          />
          <h2 className="text-2xl font-bold">
            HELLO, I'm <b className="text-red-800">{auth?.user?.name}</b>
          </h2>
        </div>
        <p className="mt-2">
          I'm a creative Web Developer with a passion for building innovative and user-friendly web applications.
          I'm currently working remotely, but I'm always looking for opportunities to collaborate and grow with my team.
        </p>
        <Button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Contact us
        </Button>
        <div className="flex mt-4 space-x-4">
          <a href="#" className="text-green-400 hover:text-green-500">
            <i className="fab fa-facebook-square" />
          </a>
          <a href="#" className="text-green-400 hover:text-green-500">
            <i className="fab fa-twitter-square" />
          </a>
          <a href="#" className="text-green-400 hover:text-green-500">
            <i className="fab fa-instagram-square" />
          </a>
          <a href="#" className="text-green-400 hover:text-green-500">
            <i className="fab fa-github-square" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
