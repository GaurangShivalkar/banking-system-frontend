
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

function LoginPage() {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post("/auth/login", { email, password });
      const token = response.data.token; // Assuming your backend returns just the token
      const refreshToken = response.data.refreshToken;
      // Store the token in localStorage
      localStorage.setItem("token", `${token}`);
      localStorage.setItem("refreshToken", `${refreshToken}`);

      //get data from token
      const userResponse = await axios.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userData = userResponse.data;
     
      const role = userData.role;
      if(role == "ROLE_USER") {
        const email = userData.email;
        const customerResponse = await axios.get(`/api/users/getCustomerId/${email}`);
        localStorage.setItem("customerId", customerResponse.data);
        navigate("/dashboard");
      }
      else if(role == "ROLE_ADMIN") {
        navigate("/admin");
      }
    } catch (error) {
      alert("Login failed:", error);
    }
  };
  
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-blue-900">
      <form onSubmit={handleLogin} className="md:backdrop-blur-sm border border-gray-200 rounded-lg bg-black/30 px-8 pt-6 pb-8 mb-4">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Login to Your Account</h1>
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
            required/>
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-xl font-bold text-blue-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="***********"
            className="w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring focus:ring-cyan-300"
            required/>
        </div>
        <button
          type="submit"
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
        >
          Sign In
        </button>
        <p className="text-xl text-center mt-4 text-gray-500">
          Don't have an account?{" "}
          <a href="./registration" className="text-cyan-600 hover:underline">
            Register here
          </a>
        </p>
        <p className="text-xl text-center mt-4 text-gray-500">
        Don't remember your password?{" "}
          <a href="./forgetPassword" className="text-cyan-600 hover:underline">
            Click here
          </a>
        </p>
      </form>
    </section>
  );
}
export default LoginPage;