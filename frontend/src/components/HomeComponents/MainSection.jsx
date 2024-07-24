import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../../images/Image1.jpg";
import image2 from "../../images/Image2.jpg";
import image3 from "../../images/Image3.jpg";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";


function MainSection() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [image1, image2, image3];

  const handleCreateAccount = () => {
    navigate("/kyc");
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="main-section" className="min-h-full bg-gray-800 flex justify-center">
      <div className="relative max-w-4xl overflow-hidden ">
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img src={image} alt={`Slide ${index + 1}`} className="w-full h-[30rem] object-cover rounded-lg" />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-lg text-white p-5 rounded-full"
        >
          <MdArrowBackIos/>
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-lg text-white p-5 rounded-full"
        >
        <MdArrowForwardIos/>
        </button>
      </div>

    </section>
  );
}

export default MainSection;
