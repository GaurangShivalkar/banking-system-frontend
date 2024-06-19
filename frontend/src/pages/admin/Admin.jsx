import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

// Register the necessary elements with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Admin = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetch call with dummy data
    const fetchDashboardData = () => {
      const dummyData = {
        totalUsers: 150,
        totalTransactions: 2000,
        totalRevenue: 50000,
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

    fetchDashboardData();
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

  const barChartData = {
    labels: dashboardData.transactionMonths,
    datasets: [
      {
        label: "Transactions",
        data: dashboardData.transactionsData,
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
    labels: dashboardData.userTypes,
    datasets: [
      {
        label: "User Types",
        data: dashboardData.userTypeData,
        backgroundColor: ["rgba(45, 55, 72, 1)", "rgba(76, 84, 100, 1)", "rgba(109, 116, 129, 1)"],
        borderColor: ["rgba(45, 55, 72, 2)", "rgba(76, 84, 100, 2)", "rgba(109, 116, 129, 2)"],
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
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Users</h2>
            <p>{dashboardData.totalUsers}</p>
          </div>
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Transactions</h2>
            <p>{dashboardData.totalTransactions}</p>
          </div>
          <div className="bg-gray-800 shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold mb-2">Total Revenue</h2>
            <p>{dashboardData.totalRevenue}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-200 shadow-lg rounded-lg p-4">
            <h2 className="text-xl text-black font-bold mb-2">Transactions Over Months</h2>
            <Bar data={barChartData} options={{ plugins: { legend: { labels: { color: 'black' } } }, scales: { x: { ticks: { color: 'black' } }, y: { ticks: { color: 'black' } } } }} />
          </div>

          <div className="bg-gray-200 shadow-lg rounded-lg p-4">
            <h2 className="text-xl text-black font-bold mb-2">User Types</h2>
            <Pie data={pieChartData} options={{ plugins: { legend: { labels: { color: 'black' } } } }} />
          </div>
        </div>

        <div className="bg-gray-200 shadow-lg rounded-lg p-4">
          <h2 className="text-xl text-black font-bold mb-2">Revenue Over Months</h2>
          <Line data={lineChartData} options={{ plugins: { legend: { labels: { color: 'black' } } }, scales: { x: { ticks: { color: 'black' } }, y: { ticks: { color: 'black' } } } }} />
        </div>
      </div>
    </div>
  );
};

export default Admin;
