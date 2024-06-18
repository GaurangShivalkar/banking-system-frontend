import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AiOutlineDashboard,
  AiOutlineBank,
  AiOutlineTransaction,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineContacts,
  AiOutlinePayCircle
} from 'react-icons/ai';

function NavbarComponent() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    navigate('/login');
  };

  const menuItems = [
    {
      label: 'Dashboard',
      to: '/dashboard',
      icon: <AiOutlineDashboard className="mr-3" />,
    },
    {
      label: 'Accounts',
      to: '/accounts',
      icon: <AiOutlineBank className="mr-3" />,
    },
    {
      label: 'Transactions',
      to: '/transactions',
      icon: <AiOutlineTransaction className="mr-3" />,
    },
    {
      label: 'Payment',
      to: '/payment',
      icon: <AiOutlinePayCircle className="mr-3" />,
    },
    {
      label: 'Beneficiaries',
      to: '/beneficiary',
      icon: <AiOutlineContacts className="mr-3" />,
    },
    {
      label: 'Profile',
      to: '/profile',
      icon: <AiOutlineUser className="mr-3" />,
    },
    {
      label: 'Logout',
      onClick: handleLogout,
      icon: <AiOutlineLogout className="mr-3" />,
    },
  ];

  return (
    <div>
      <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
        </svg>
      </button>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <a href="https://github.com/GaurangShivalkar" className="flex items-center ps-2.5 mb-5">
            <img src="/vite.svg" className="h-6 me-3 sm:h-7" alt="vite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">ENQ BANK</span>
          </a>

          <ul className="space-y-2 font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.to ? (
                  <Link
                    to={item.to}
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeItem === item.to ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                    onClick={() => setActiveItem(item.to)}
                  >
                    <p className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true">
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
                    className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${activeItem === item.label ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  >
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
