import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";
import axios from "../../api/axiosConfig";
import { Link } from 'react-router-dom';

// Register the necessary elements with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const Admin = () => {
  const token = localStorage.getItem("token");

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  
  useEffect(() => {
    const fetchTotalData = async () => {
      try {
          const response = await axios.get('/api/admin/getTotal', { headers: { Authorization: `Bearer ${token}` } }); // Assuming your backend is running on the same host
          setTotal(response.data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const transactionBar = async () => {
      try {
          const response = await axios.get('/api/admin/transactionsMonthWise'); // Assuming your backend is running on the same host
          setBarData(response.data); 
    
        } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const transactionPie = async () => {
      try {
          const response = await axios.get('/api/admin/transactionTypeCount'); // Assuming your backend is running on the same host
          setPieData(response.data); 
         

        } catch (error) {
          console.error('Error fetching data:', error);
      }
    };

    const fetchDashboardData = () => {
      const dummyData = {
       
        transactionMonths: ["January", "February", "March", "April", "May", "June"],
        transactionsData: [300, 500, 700, 600, 800, 900],
        revenueMonths: ["January", "February", "March", "April", "May", "June"],
        revenueData: [5000, 8000, 12000, 11000, 15000, 18000],
        userTypes: ["Active", "Inactive", "Pending"],
        userTypeData: [100, 30, 20],
      };
      setDashboardData(dummyData);
      setLoading(false);
    };

    fetchTotalData();
    fetchDashboardData();
    transactionBar();
    transactionPie();
  }, []);

  if (loading) {
    return (
      <div>
        <AdminNavbarComponent />
        <div className="p-4 sm:ml-64">
          <h1 className="text-white">Loading...</h1>
        </div>
      </div>
    );
  }

  const months = barData.map(entry => entry.month);
  const counts = barData.map(entry => entry.transactionCount);

  const barChartData = {
    labels: months,
    datasets: [
      {
        label: "Transactions",
        data: counts,
        backgroundColor: "rgba(45, 55, 72, 1)",
        borderColor: "rgba(45, 55, 72, 2)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: dashboardData.revenueMonths,
    datasets: [
      {
        label: "Revenue",
        data: dashboardData.revenueData,
        fill: false,
        backgroundColor: "rgba(45, 55, 72, 1)",
        borderColor: "rgba(45, 55, 72, 2)",
      },
    ],
  };

  const pieChartData = {
    labels: ["RTGS", "NEFT", "IMPS", "SELF", "OTHER"],
    datasets: [
      {
        label: "User Types",
        data: [pieData.RTGS, pieData.NEFT, pieData.IMPS, pieData.SELF, pieData.OTHER],
        backgroundColor: [
          "rgba(13, 21, 38, 1)", 
          "rgba(38, 64, 115, 1)", 
          "rgba(64, 107, 191, 1)", 
          "rgba(140, 166, 217, 1)", 
          "rgba(207, 215, 232, 1)"
        ],
        borderColor: [
          "rgba(13, 21, 38, 2)", 
          "rgba(38, 64, 115, 2)", 
          "rgba(64, 107, 191, 2)", 
          "rgba(140, 166, 217, 2)", 
          "rgba(217, 225, 242, 2)"
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className=" min-h-screen text-white">
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <h1 className="text-3xl text-black font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        <Link to="/adminUsers">
        <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Users</h2>
            <p>{total[0]}</p>
          </div></Link>
          <Link to="/adminTransactions">
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Transactions</h2>
            <p>{total[1]}</p>
          </div></Link>
          <Link to="/adminCustomers">
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
            <p>{total[2]} ₹</p>
          </div></Link>
          <Link to="/adminAccounts">
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Accounts</h2>
            <p>{total[3]}</p>
          </div></Link>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Link to="/adminTransactions">
          <div className="bg-gray-200 shadow-lg rounded-lg p-4 h-full w-full">
            <h2 className="text-xl text-black font-bold mb-2">Transactions Over Months</h2>
            <Bar className="h-full" data={barChartData} options={{ plugins: { legend: { labels: { color: 'black' } } }, scales: { x: { ticks: { color: 'black' } }, y: { ticks: { color: 'black' } } } }} />     
          </div></Link>

          <Link to="/adminUsers">
          <div className="bg-gray-200 shadow-lg rounded-lg p-4 h-full w-full">
            <h2 className="text-xl text-black font-bold mb-2">User Types</h2>
            <Pie data={pieChartData} options={{ plugins: { legend: { labels: { color: 'black' } } } }} />
          </div></Link>
        </div>

        {/* <Link to="/adminAccounts">
        <div className="bg-gray-200 shadow-lg rounded-lg p-4">
          <h2 className="text-xl text-black font-bold mb-2">Revenue Over Months</h2>
          <Line data={lineChartData} options={{ plugins: { legend: { labels: { color: 'black' } } }, scales: { x: { ticks: { color: 'black' } }, y: { ticks: { color: 'black' } } } }} />
        </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Admin;
