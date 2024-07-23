import React,{useEffect, useState} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';
import axios from '../../api/axiosConfig';
import { Link
  
 } from 'react-router-dom';
// Register the necessary elements with Chart.js
ChartJS.register(CategoryScale,  LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

const MonthlyStat = ({ sourceAccountId }) => {
const [barData, setBarData] = useState([]);
const token = localStorage.getItem("token");
const sai = sourceAccountId;
useEffect(() => {
  const transactionBar = async () => {
    try {
        
        const response = await axios.get("/api/transactions/changedBalance/"+sourceAccountId, { headers: { Authorization: `Bearer ${token}` } }); // Assuming your backend is running on the same host
        setBarData(response.data); 
      
      } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  if (sourceAccountId) {
  transactionBar();
  }
  
  }, [sourceAccountId]);
const data = {
  labels: barData.map(stat => stat.date),
  datasets: [
    {
      label: 'Monthly Statistics',
      data: barData.map(stat => stat.balance),
      fill: false,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.4, // For a smooth curve
    },
  ],
};

const options = {plugins: { legend: {labels: {color: 'white', }, }, }, scales: {x: {ticks: {color: 'white', }, }, y: {ticks: {color: 'white', }, }, }, };

  return (
    <Link to="/payment">
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
      <h3 className="text-lg text-white">Monthly Statistics</h3>
      <div className="mt-2">
        <Line data={data} options={options} />
      </div>
    </div></Link>
  );
};

export default MonthlyStat;
