import React, { useState, useRef, useEffect } from 'react';
import user from '../images/No_user.jpg';
import { FaShoppingCart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiHeart } from "react-icons/fi";
import { GoHeartFill } from "react-icons/go";
import DarkLightModeToggle from "./DarkLightMode";
import { TbShoppingBagX } from 'react-icons/tb';
import { Button, Menu } from '@headlessui/react';
import { Link, useNavigate } from 'react-router-dom';
import { resetCart } from '../redux/actions/cartActions';
import { resetWish } from '../redux/actions/wishAction';

import { useAuth } from '../context/auth';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  // console.log(auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartSlice);
  const { wishItems } = useSelector((state) => state.WishSlice);
  const clearCart = () => dispatch(resetCart());
  const clearWish = () => dispatch(resetWish());


  const Logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
  const [favDropdownOpen, setFavDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const cartDropdownRef = useRef(null);
  const favDropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      cartDropdownRef.current &&
      !cartDropdownRef.current.contains(e.target) &&
      favDropdownRef.current &&
      !favDropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
      setCartDropdownOpen(false);
      setFavDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className=" w-full fixed z-30 ">
      <nav className="bg-white dark:bg-gray-700 mx-auto">
        <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center">
              <span className="lg:text-3xl font-bold md:text-lg sm:text-xs">
                <span className="text-white -px-2 bg-[red]">NE</span>
                <span className="text-yellow-500">XTIFY</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-6">
              <Link to="/" className="text-black dark:text-white flex font-semibold text-xl items-center gap-1 px-3 py-2">Home</Link>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 px-4 py-2 rounded-md">
                  <span className="text-black dark:text-white font-semibold text-xl">Category</span>
                </button>
                <div className={`absolute mt-3 w-48 dark:bg-gray-600 bg-gray-200 text-md text-black dark:text-white rounded-md shadow-2xl overflow-hidden transition-all duration-500 ease-in-out ${isDropdownOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <ul className="flex flex-col">
                    <Link to="#" className="px-4 hover:bg-gray-300 dark:hover:bg-gray-700 py-2">Electronics</Link>
                    <Link to="#" className="px-4 hover:bg-gray-300 dark:hover:bg-gray-700 py-2">Accessories</Link>
                    <Link to="#" className="px-4 hover:bg-gray-300 dark:hover:bg-gray-700 py-2">Wooden Instruments</Link>
                    <Link to="#" className="px-4 hover:bg-gray-300 dark:hover:bg-gray-700 py-2">Jullary</Link>
                    <Link to="#" className="px-4 hover:bg-gray-300 dark:hover:bg-gray-700 py-2"> Children Toys</Link>
                  </ul>
                </div>
              </div>
              <Link to="/contact" className="text-black dark:text-white flex items-center font-semibold text-xl gap-1 px-3 py-2">ContactUs</Link>
            </div>

            {/* SearchBar */}
            <div className="sm:flex items-center space-x-4">
              <div className="relative">
                <input type="text" className="bg-[silver] border text-black text-sm rounded-full pl-2 pr-4 py-1 focus:outline-none focus:ring-2" placeholder="Search..." />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right-Side Icons */}
            <div className="sm:flex items-center flex space-x-3">
              <div className='relative group'>
                <DarkLightModeToggle />
              </div>

              {/* Favourite Items */}
              <div title='Faverite items' className='relative' ref={favDropdownRef} >
                <span onClick={() => setFavDropdownOpen(!favDropdownOpen)} className="mx-3 flex items-center" >
                  {isFavorite ? <FiHeart className='text-[red] ml-3 text-4xl hover:animate-bounce' /> : <GoHeartFill className='text-[red] ml-3 text-4xl hover:animate-bounce' />}
                  {wishItems.length > 0 && (
                    <span className="bg-[red] text-white animate-bounce rounded-full text-xs w-4 h-4 flex items-center justify-center absolute -top-2 right-1">
                      {wishItems.length}
                    </span>
                  )}
                </span>
                {favDropdownOpen && (
                  <div className="absolute top-10 right-0 w-48 bg-gray-200 ">
                    {wishItems.length > 0 ? (
                      <ul>
                        {wishItems.map((item) => (
                          <li key={item.id} className="px-4 py-2 hover:bg-gray-300 ">
                            <div className="flex items-center space-x-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-8 w-8 object-cover"
                              />
                              <p className="text-black">{item.name}</p>
                              {/* <span className="text-gray-600 pl-3">x{item.qty}</span> */}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600 text-center p-4">No items in your wishlist</p>
                    )}
                    <div className="flex items-center justify-between px-3 py-2 ">
                      <Link
                        to="/WishCard"
                        className="px-4 py-1 text-center text-white bg-red-600 hover:bg-red-500 rounded-md"
                      >
                        View Favourite
                      </Link>
                      <button
                        onClick={clearWish}
                        title="clearWish"
                        className="text-red-600 text-xl"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart */}
              <div title="Cart" className="relative " ref={cartDropdownRef}>
                <span onClick={() => setCartDropdownOpen(!cartDropdownOpen)} className="mx-3 flex items-center" >
                  <FaShoppingCart className="text-black dark:text-gray-200 text-4xl cursor-pointer " />
                  {cartItems.length > 0 && (
                    <span className="bg-[red] text-white animate-bounce rounded-full text-xs w-4 h-4 flex items-center justify-center absolute -top-2 right-1">
                      {cartItems.length}
                    </span>
                  )}
                </span>
                {cartDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-slate-200 rounded-md shadow-2xl z-20">
                    {cartItems.length > 0 ? (
                      <ul>
                        {cartItems.map((item) => (
                          <li
                            key={item.id}
                            className="p-2 border-b border-gray-300"
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-8 w-8 object-cover"
                              />
                              <p className="text-black">{item.name}</p>
                              <span className="text-gray-600 pl-3">x{item.qty}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="p-2 text-black">Your cart is empty.</p>
                    )}
                    <div className="flex items-center justify-between px-3 py-2 ">
                      <Link
                        to="/CartPage"
                        className="px-4 py-1 text-center text-white bg-red-600 hover:bg-red-500 rounded-md"
                      >
                        View Cart
                      </Link>
                      <button
                        onClick={clearCart}
                        title="Clear Cart"
                        className="text-red-600 text-xl"
                      >
                        <TbShoppingBagX />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* User Menu */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center focus:outline-none">
                  <img className="h-12 w-12 rounded-full border-2 border-gray-400 object-cover" src={auth?.user?.profileImage || user} alt="User" />
                </Menu.Button> 
                {auth?.user ? (
                  <Menu.Items className="absolute right-0 w-72 bg-gray-200 shadow-lg rounded-lg mt-2 z-10">
                    <div className="flex items-center">
                      <img className="h-10 w-10 my-2 pb-0 ml-1 rounded-full border-2 border-gray-400 object-cover" src={auth?.user?.profileImage || user} alt="User" />
                      <div className="ml-2">
                        <span className="text-sm font-medium text-black">{auth?.user?.name}</span>
                        <span className="text-md text-black block">{auth?.user?.email}</span>
                      </div>
                    </div>
                    <div className="border-t border-white"></div>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/dashboard" className={`block px-4 py-3 text-sm font-medium text-black ${active ? "bg-gray-300" : ""}`}>
                          Dashboard
                        </Link>
                      )}
                    </Menu.Item>
                    <div className="p-4 flex items-center justify-center">
                      <Button onClick={Logout} className="bg-blue-600 text-white text-sm font-semibold px-24 py-2 rounded-md hover:bg-blue-700 transition duration-150">
                        Logout
                      </Button>
                    </div>
                  </Menu.Items>
                ) : (
                  <Menu.Items className="absolute right-0 w-64 bg-gray-200 shadow-lg rounded-lg mt-2 z-10">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          className={`block px-4 py-3 text-sm font-medium text-black ${active ? "bg-gray-300" : ""}`}
                        >
                          Login
                        </Link>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/signup"
                          className={`block px-4 py-3 text-sm font-medium text-black ${active ? "bg-gray-300" : ""}`}
                        >
                          Signup
                        </Link>
                      )}
                    </Menu.Item>

                  </Menu.Items>
                )}
              </Menu>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-black dark:text-gray-200 ">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`sm:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="bg-gray-200 shadow-2xl  p-4">
            <Link to="/" className="block px-3 py-2 text-black">Home</Link>
            <Link to="/contact" className="block px-3 py-2 text-black">Contact Us</Link>
            <Button className="block px-3 py-2 text-black">category</Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
