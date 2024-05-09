import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDashboard, AiOutlineBank, AiOutlineTransaction, AiOutlineUser, AiOutlineLogout } from 'react-icons/ai';

function NavbarComponent() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Redirect to the login page or any other appropriate page
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
    <div className="bg-cyan-200 min-h-screen w-full md:w-1/5 md:fixed md:left-0 md:top-0 py-6 px-4">
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Banking Dashboard</h1>
        <nav>
          <ul>
            {menuItems.map((item, index) => (
              <li key={index} className="mb-4">
                {item.to ? (
                  <Link
                    to={item.to}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="flex items-center text-gray-700 hover:text-red-600"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-auto text-center md:text-left">
        <p className="text-sm text-gray-600">Version 1.0</p>
      </div>
    </div>
  );
}

export default NavbarComponent;
