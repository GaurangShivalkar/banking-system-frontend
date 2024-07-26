import React from "react";
import { useNavigate } from "react-router-dom";
import image4 from "../../images/Image4.jpg"; // Adjust the path to match your project structure

function HeroSection() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        // Navigate to the create account route
        navigate("/kyc");
    };

    return (
        <section id="hero-section" className="py-14 lg:py-24 relative ">
            {/* <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image4})` }}></div> */}
            <div className="relative z-10 text-center max-w-xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-bold  mb-4" data-aos="zoom-y-out">Digital Banking</h1>
                <p className="text-lg lg:text-xl mb-6" data-aos="zoom-y-out" data-aos-delay="150">
                    Take your financial life online. Your ENQ Bank account will be a one-stop-shop for spending, saving, budgeting, investing, and much more.
                </p>
                <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                    <button 
                        onClick={handleCreateAccount} 
                        className="btn p-5 rounded-3xl text-white bg-blue-500 hover:bg-blue-600 w-full sm:w-auto sm:mb-0 shadow-lg"
                    >
                        Create Account
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
