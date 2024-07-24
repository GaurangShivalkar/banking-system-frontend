import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [top, setTop] = useState(true);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Navigate to the login route
        navigate("/login");
    };

    const handleSignUp = () => {
        // Navigate to the sign up route
        navigate("/registration");
    };

    // Detect whether user has scrolled the page down by 10px 
    useEffect(() => {
        const scrollHandler = () => {
            window.pageYOffset > 10 ? setTop(false) : setTop(true);
        };
        window.addEventListener('scroll', scrollHandler);
        return () => window.removeEventListener('scroll', scrollHandler);
    }, [top]);

    return (
        <header 
            className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top && 'shadow-lg'}`} 
            style={!top ? { backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.8)' } : {}}
        >
            <div className="max-w-6xl mx-auto px-5 sm:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Site branding */}
                    <div className="flex-shrink-0 mr-4">
                        {/* Logo */}
                        <img src="/vite.svg" className="h-6 me-3 sm:h-7" alt="vite Logo" style={{ backdropFilter: 'none' }} />
                       
                    </div>
                    ENQ BANK
                    {/* Site navigation */}
                    <nav className="flex flex-grow">
                        <ul className="flex flex-grow justify-end flex-wrap items-center">
                            <li>
                                <button 
                                    onClick={handleLogin} 
                                    className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out" 
                                    style={{ backdropFilter: 'none' }}
                                >
                                    Sign in
                                </button>
                            </li>
                            <li>
                                <button onClick={handleSignUp} className="p-4 text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3" style={{ backdropFilter: 'none' }}>
                                    <span>Sign up</span>
                                </button>
                            </li>
                        </ul>
                    </nav>

                </div>
            </div>
        </header>
    );
}

export default Header;
