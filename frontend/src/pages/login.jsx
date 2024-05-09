
import React,{useState} from "react";
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
      const token = response.data; // Assuming your backend returns just the token

      // Store the token in localStorage
      localStorage.setItem("token", `${token}`);
      navigate("/dashboard");

      // Redirect to another page or perform other actions upon successful login
      // Example: window.location.href = '/dashboard';
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (e.g., display error message to user)
    }
  };
  return (
    <section className="flex flex-col items-center justify-center h-screen bg-cyan-100">
    <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h1 className="text-3xl font-bold text-cyan-800 mb-6 text-center">Login to Your Account</h1>
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
      <div className="mb-6">
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
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
      >
        Sign In
      </button>
      <p className="text-xl text-center mt-4 text-gray-800">
        Don't have an account?{" "}
        <a href="./registration" className="text-cyan-600 hover:underline">
          Register here
        </a>
      </p>
    </form>
  </section>
  );
}

export default LoginPage;
