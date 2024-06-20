import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

// Register the necessary elements with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);
const [barData, setBarData] = useState([]);


useEffect(() => {
  const transactionBar = async () => {
    try {
        const response = await axios.get(`/api/transactions/getTransactionBySourceAccountId/${sourceAccountId}`, { headers: { Authorization: `Bearer ${token}` } }); // Assuming your backend is running on the same host
        setBarData(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
    }
  };
  transactionBar();
  
  }, []);
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

const options = {
  plugins: {
    legend: {
      labels: {
        color: 'white',
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: 'white',
      },
    },
    y: {
      ticks: {
        color: 'white',
      },
    },
  },
};

const MonthlyStats = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-4">
      <h3 className="text-lg text-white">Monthly Statistics</h3>
      <div className="mt-2">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyStats;
