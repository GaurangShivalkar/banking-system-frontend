import React from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import image1 from "../../images/Image1.jpg";
import image2 from "../../images/Image2.jpg";
import image3 from "../../images/Image3.jpg";

function MainSection() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    // Navigate to the create account route
    navigate("/kyc");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section id="main-section" className="relative min-h-screen">
      <Slider {...settings} className="absolute w-full h-full z-0">
        <div className="w-full h-screen">
          <img src={image1} alt="Banking 1" className="w-full h-full object-cover" />
        </div>
        <div className="w-full h-screen">
          <img src={image2} alt="Banking 2" className="w-full h-full object-cover" />
        </div>
        <div className="w-full h-screen">
          <img src={image3} alt="Banking 3" className="w-full h-full object-cover" />
        </div>
      </Slider>
      {/* <div className="container absolute bottom-10 left-10 z-10 p-4 bg-white bg-opacity-75 rounded-lg text-center max-w-sm">
        <h1 className="text-2xl lg:text-3xl text-primary-dark-blue pb-2">
          Digital Banking
        </h1>
        <p className="text-neutral-grayish-blue text-xs lg:text-base leading-5 mb-4">
          Take your financial life online. Your ENQ Bank account will be a
          one-stop-shop for spending, saving, budgeting, investing, and much
          more.
        </p>
        <button
          onClick={handleCreateAccount}
          className="text-white bg-blue-700 hover:bg-blue-800 px-7 py-3 rounded-full text-xs"
        >
          Create Account
        </button>
      </div> */}
    </section>
  );
}

export default MainSection;