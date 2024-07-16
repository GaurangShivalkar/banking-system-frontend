import React from "react";
import { useNavigate } from "react-router-dom";
import image4 from "../../images/Image4.jpg"; // Adjust the path to match your project structure

function SecondarySection() {
    const navigate = useNavigate();

    const handleCreateAccount = () => {
        // Navigate to the create account route
        navigate("/kyc");
    };

    return (
        <section id="features" className="py-14 bg-neutral-light-grayish-blue lg:py-24 relative">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image4})` }}></div>
            <div className="relative z-10 text-center max-w-xl mx-auto">
                <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                    Digital Banking
                </h1>
                <p className="text-neutral-grayish-blue text-lg lg:text-xl mb-6">
                    Take your financial life online. Your ENQ Bank account will be a one-stop-shop for spending, saving, budgeting, investing, and much more.
                </p>
                <button onClick={handleCreateAccount} className="text-white bg-blue-700 hover:bg-blue-800 px-7 py-3 rounded-full text-sm lg:text-base shadow-lg">
                    Create Account
                </button>
            </div>
        </section>
    );
}

export default SecondarySection;
