import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineMenu, MdArrowBackIos } from 'react-icons/md';

function Header() {
  const [top, setTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/registration");
  };

  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
  }, [top]);

  return (
    <header
      className={`text-white fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'shadow-lg'}`}
      style={!top ? { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(28, 28, 30, 0.8)' } : {}}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <Link to="/">
            <div className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                <img src="/vite.svg" className="h-6 sm:h-7" alt="vite Logo" style={{ backdropFilter: 'none' }} />
              </div>
              <h1 className="text-xl font-bold">ENQ BANK</h1>
            </div>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
               onClick={() => { setMenuOpen(!menuOpen);  setTop(false); }} 
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <MdOutlineMenu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="ml-28 hidden md:flex md:items-center md:justify-between md:w-auto">
            <ul className="flex flex-col md:flex-row md:space-x-8 rtl:space-x-reverse p-4 md:p-0 font-medium">
              <li><a href="#hero-section" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Home</a></li>
              <li><a href="#features" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Features</a></li>
              <li><a href="#security" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Security</a></li>
              <li><a href="#customer-support" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">Support</a></li>
              <li><a href="#about-us" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white">About Us</a></li>
            </ul>
          </nav>

          {/* Desktop Sign in / Sign up buttons */}
          <nav className="hidden md:flex md:flex-grow md:justify-end md:items-center">
            <ul className="flex flex-grow justify-end flex-wrap items-center">
              <li>
                <button
                  onClick={handleLogin}
                  className="font-medium text-gray-400 hover:text-blue-700 px-5 py-3 flex items-center transition duration-150 ease-in-out"
                >
                  Sign in
                </button>
              </li>
              <li>
                <button onClick={handleSignUp} className="p-4 text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                  Sign up
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="flex flex-col space-y-2 py-4 px-2">
            <li><a href="#hero-section" className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black">Home</a></li>
            <li><a href="#features" className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black">Features</a></li>
            <li><a href="#security" className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black">Security</a></li>
            <li><a href="#customer-support" className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black">Support</a></li>
            <li><a href="#about-us" className="block py-2 px-3 text-white rounded hover:bg-gray-100 hover:text-black">About Us</a></li>
            <li>
              <button
                onClick={handleLogin}
                className="font-medium text-gray-400 hover:text-blue-700 px-5 py-3 flex items-center transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </li>
            <li>
              <button onClick={handleSignUp} className="p-4 text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
                Sign up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
