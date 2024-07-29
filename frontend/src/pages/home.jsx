import React from "react";
import { useNavigate } from 'react-router-dom';
import MainSection from "../components/HomeComponents/MainSection";
import Features from "../components/HomeComponents/Features";
import Footer from "../components/HomeComponents/Footer";
import Header from "../components/HomeComponents/Header";
import AboutUs from "../components/HomeComponents/AboutUs";
import Security from "../components/HomeComponents/Security";
import CustomerSupport from "../components/HomeComponents/CustomerSupport";
import HeroSection from "../components/HomeComponents/HeroSection";

// function Header() {
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     // Navigate to the login route
//     navigate("/login");
//   };

//   const handleSignUp = () => {
//     // Navigate to the sign up route
//     navigate("/registration");
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
//           <img src="/vite.svg" className="h-8" alt="Flowbite Logo" />
//           <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ENQ BANK</span>
//         </a>
//         <div className="flex md:order-2 gap-5 space-x-3 md:space-x-0 rtl:space-x-reverse">
//           <button type="button" onClick={handleSignUp} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 gap-10 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign up</button>
//           <button type="button" onClick={handleLogin} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
//           {/* <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
//             <span className="sr-only">Open main menu</span>
//             <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
//               <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
//             </svg>
//           </button> */}
//         </div>
//         <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
//           <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

//             <li>
//               <a href="#main-section" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Home</a>
//             </li>
//             <li>
//               <a href="#features" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//             </li>
//             <li>
//               <a href="#footer" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

function HomePage() {
  return (
    <div>
      <Header/>
       {/* <div className="pt-20 items-center pb-11 bg-theme-image bg-cover bg-center text-white">  */}
    <div className="pt-20 items-center pb-11 bg-gradient-to-r from-slate-900 to-blue-900 text-white"> 
      
        <HeroSection/>
        <Features />
        <Security/>
        <CustomerSupport/>
        <AboutUs/>
        {/* <MainSection />  */}
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
