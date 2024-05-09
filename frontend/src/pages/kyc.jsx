import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function KycPage() {
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [zipCode, setZipCode] = useState("");
  const navigate = useNavigate();

  const handleKYCSubmit = (e) => {
    e.preventDefault();

    // Assuming KYC information submission logic here

    const kycData = {
      fullName,
      address,
      aadharNo,
      panNo,
      phoneNo,
      zipCode,
    };

    // Example submission logic (replace with actual backend integration)
    console.log("Submitting KYC Data:", kycData);

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
              <label htmlFor="fullName" className="block text-xl font-bold text-cyan-600 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
              <label htmlFor="aadharNo" className="block text-xl font-bold text-cyan-600 mb-2">
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNo"
                value={aadharNo}
                onChange={(e) => setAadharNo(e.target.value)}
                placeholder="Enter your Aadhar number"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
          </div>
          {/* Column 2 */}
          <div>
            <div className="mb-4">
              <label htmlFor="panNo" className="block text-xl font-bold text-cyan-600 mb-2">
                PAN Number
              </label>
              <input
                type="text"
                id="panNo"
                value={panNo}
                onChange={(e) => setPanNo(e.target.value)}
                placeholder="Enter your PAN number"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNo" className="block text-xl font-bold text-cyan-600 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="zipCode" className="block text-xl font-bold text-cyan-600 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                id="zipCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
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
