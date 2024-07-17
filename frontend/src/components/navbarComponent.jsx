import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import {AiOutlineTransaction, AiOutlineContacts,} from 'react-icons/ai';
import {MdOutlineDashboard, MdAccountBalance, MdArrowBackIos, MdOutlinePayments, MdOutlinePerson, MdLogout, MdOutlineMenu} from "react-icons/md";

function NavbarComponent() {

  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    navigate('/');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: <MdOutlineDashboard className="mr-3" />,
    },
    {
      label: 'Accounts',
      to: '/accounts',
      icon: <MdAccountBalance className="mr-3" />,
    },
    {
      label: 'Transactions',
      to: '/transactions',
      icon: <AiOutlineTransaction className="mr-3" />,
    },
    {
      label: 'Payment',
      to: '/payment',
      icon: <MdOutlinePayments className="mr-3" />,
    },
    {
      label: 'Beneficiaries',
      to: '/beneficiary',
      icon: <AiOutlineContacts className="mr-3" />,
    },
    {
      label: 'Profile',
      to: '/profile',
      icon: <MdOutlinePerson className="mr-3" />,
    },
    {
      label: 'Logout',
      onClick: handleLogout,
      icon: <MdLogout className="mr-3" />,
    },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  

  return (
    <div >
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        onClick={toggleSidebar} // Toggle sidebar visibility on button click
      >
        <span className="sr-only">Open sidebar</span>
        <MdOutlineMenu className="w-6 h-6"/>
      </button>

      <aside id="logo-sidebar" className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full' } sm:translate-x-0`}>
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
      
          <div className="flex items-center justify-between ps-2.5 mb-5">
            <Link to="/" className="flex items-center">
              <img src="/vite.svg" className="h-6 me-3 sm:h-7" alt="vite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ENQ BANK</span>
            </Link>
            <button type="button" className="inline-flex items-center p-2 ms-3 sm:hidden" onClick={toggleSidebar} aria-hidden="true">
              <MdArrowBackIos />
            </button>
          </div>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeItem === item.to ? 'bg-gray-200 dark:bg-gray-700' : ''
                      }`}
                    onClick={() => {
                      setActiveItem(item.to);
                      setSidebarOpen(false);
                      // Close sidebar on link click
                    }}
                  >
                    <p
                      className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </p>
                    <span className="ms-3">{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      item.onClick();
                      setActiveItem('');
                    }}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeItem === item.label ? 'bg-gray-200 dark:bg-gray-700' : ''}"           >
                    <p className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true">
                      {item.icon}
                    </p>
                    <span className="ms-3">{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default NavbarComponent;