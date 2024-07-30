import React, { useState } from "react";
import axios from "../api/axiosConfig";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const handleForgetPassword = async (e) => {
    e.preventDefault();

    const response = await axios.get("/auth/forgetPassword/" + email);
    //toast.success("mail has been sent to registered id",{autoClose:3000})
    toast.success("mail has been sent to registered id", { position: "top-center", autoClose: 5000, theme: "dark" });
  }

  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-blue-900">
      <ToastContainer />
      <form onSubmit={handleForgetPassword} className="md:backdrop-blur-sm border border-gray-200 rounded-lg bg-black/30 px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Submit Email for Reset Password</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-xl font-bold text-blue-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@yourmail.com"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required />
        </div>
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Submit Email
        </button>
      </form>
    </section>
  );
}
export default ForgetPassword;