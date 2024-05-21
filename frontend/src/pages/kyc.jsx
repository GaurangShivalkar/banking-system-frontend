import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

function KycPage() {
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const navigate = useNavigate();

  const handleKYCSubmit = async (e) => {
    e.preventDefault();

    // Assuming KYC information submission logic here

    const kycData = {
      customerName: customerName,
      address: address,
      aadharNumber: aadharNumber,
      panNumber: panNumber,
      phoneNumber: phoneNumber,
      zipcode: zipcode,
    };

    console.log('Submitting KYC Data:', kycData);
    await axios.post("/api/customers/saveCustomer", kycData);
    localStorage.setItem("panNumber", `${panNumber}`);

    // After successful submission, navigate to the dashboard or next page
    navigate("/createAccount");
  };

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-cyan-100">
      <form onSubmit={handleKYCSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">Complete KYC</h1>
        <div className="grid grid-cols-2 gap-4">
          {/* Column 1 */}
          <div>
            <div className="mb-4">
            {/* <input
                type="hidden"
                id="userId"
                value={userId}
                onChange={(e) => setUser(2)}
              /> */}
              <label htmlFor="cusomerName" className="block text-xl font-bold text-cyan-600 mb-2">
                Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-xl font-bold text-cyan-600 mb-2">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="aadharNumber" className="block text-xl font-bold text-cyan-600 mb-2">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNumber"
                value={aadharNumber}
                onChange={(e) => setAadharNumber(e.target.value)}
                placeholder="Enter your Aadhar number"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
          </div>
          {/* Column 2 */}
          <div>
            <div className="mb-4">
              <label htmlFor="panNumber" className="block text-xl font-bold text-cyan-600 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                id="panNumber"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                placeholder="Enter your PAN number"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-xl font-bold text-cyan-600 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zipcode" className="block text-xl font-bold text-cyan-600 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
                placeholder="Enter your ZIP code"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Continue 
        </button>
      </form>
    </section>
  );
}

export default KycPage;
