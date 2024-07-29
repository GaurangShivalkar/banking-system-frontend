import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";

function UserRegister() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const role = "USER";
  const [customerId, setCustomerId] = useState("");
  const navigate = useNavigate();


  const fetchCustomerId = async () => {
    try {
      const dbdata = await axios.get("/api/customers/showCustomer/" + customerId);
      return dbdata.data; 
    } catch (error) {
      console.error("The customer didn't exist:", error);
      return null; 
    }
  };
  
  const handleRegistration = async (e) => {
    e.preventDefault();
  
    const customerData = await fetchCustomerId();
    const customerEmail = customerData.email;

    if (customerData && customerEmail === email) {
      // Proceed with registration if customer exists
      localStorage.setItem("registrationData", JSON.stringify({ username, email, password, role:"USER", customerId }));
      try {
        const response = await axios.get(`/auth/generateOtp?key=${1234}&email=${email}` );
        console.log(response);
        navigate("/otp"); // Redirect to OTP page after successful registration
      } catch (error) {
        console.error("Error sending mail:", error);
        alert("Error sending mail. Please try again.");
      }
    } else {
      // Display alert if customer does not exist
      alert("The customer does not exist. Please check the customer ID.");
    }
  };

    return (
        <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-slate-900 to-blue-900">
          <form onSubmit={handleRegistration} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">Create Your Account</h1>
            <div>
            <label htmlFor="username" className="block text-xl font-bold text-cyan-600 mb-2">
                Customer Number
              </label>
              <input 
                type="text"
                id="customerId"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-xl font-bold text-cyan-600 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-xl font-bold text-cyan-600 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@yourmail.com"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-xl font-bold text-cyan-600 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="***********"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
          
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-gray-800 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            >
              Continue
            </button>
            <p className="text-xl text-center mt-4 text-gray-800">
              Already have an account?{" "}
              <a href="./login" className="text-cyan-600 hover:underline">
                login here
              </a>
            </p>
            <p className="text-xl text-center mt-4 text-gray-800">
              Didnt have the customer id?{" "}
              <a href="./kyc" className="text-cyan-600 hover:underline">
                Open a account here
              </a>
            </p>
          </form>
        </section>
      );
}


export default UserRegister;