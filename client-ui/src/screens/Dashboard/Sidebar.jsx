import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaUsers } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null); // Manage active dropdown
  const dropdownRefs = useRef([]); // Reference for all dropdowns

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRefs.current.every(
          (ref) => ref && !ref.contains(event.target)
        )
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shadow-2xl flex  ">
      <div
        className={`bg-gray-200 dark:bg-gray-950 dark:text-white text-black space-y-6 py-7 px-2 left-0 h-screen transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-10"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          {isSidebarOpen && (
            <h2 className="text-xl font-bold dark:text-white text-black">Dashboard</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="dark:text-white text-black p-2 rounded-md"
          >
            <FaBars />
          </button>
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {[
              {
                title: "Setting",
                icon: <FaUsers />,
                links: [
                  "profile",
                  "updateprofile",
                  "upload-image",
                  "changepassword",
                ],
              },
              {
                title: "Products",
                icon: <MdProductionQuantityLimits />,
                links: [
                  "cartPage",
                  "updateprofile",
                  "upload-image",
                  "change-password",
                ],
              },
              {
                title: "Orders",
                icon: <GiShoppingCart />,
                links: [
                  "cart Page",
                  "updateprofile",
                  "Upload-Image",
                  "change-password",
                ],
              },
              {
                title: "Users",
                icon: <ImUsers />,
                links: [
                  "cartPage",
                  "updateprofile",
                  "uploadimage",
                  "change password",
                ],
              },
            ].map((item, index) => (
              <li
                className="relative group"
                key={index}
                ref={(el) => (dropdownRefs.current[index] = el)}
              >
                <button
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                  className="flex items-center px-4 py-2 space-x-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-800 "
                >
                  {isSidebarOpen && (
                    <span className="text-xl">{item.icon}</span>
                  )}
                  {isSidebarOpen && (
                    <span className="whitespace-nowrap">{item.title}</span>
                  )}
                </button>

                {/* Dropdown */}
                {isSidebarOpen && (
                  <div
                    className={`left-0 mt-2 w-48 bg-gray-300 dark:bg-gray-800 dark:text-white text-black rounded-md shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === index
                        ? "max-h-60 opacity-100"
                        : "max-h-0 opacity-0"
                      }`}
                  >
                    <ul className="flex flex-col">
                      {item.links.map((link, idx) => (
                        <li key={idx}>
                          <Link
                            to={link}
                            className="block w-full px-4 py-2 hover:bg-gray-400"
                          >
                            {link.replace("-", " ").toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
