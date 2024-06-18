import React,{useState, useEffect} from 'react';
import axios from '../../api/axiosConfig';


const BeneficiaryData = ({ beneficiaries }) => {
    const [beneficiaryList, setBeneficiaryList] = useState([]);
    const token = localStorage.getItem('token');
    const customerId = localStorage.getItem('customerId');

  
    useEffect(() => {
        const fetchBeneficiaryDetails = async () => {
            try {
      
              const responseBeneficiary = await axios.get('/api/beneficiaries/getBeneficiaryByCustomerId', {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                  customerId: customerId
                }
              });
      
      
              setBeneficiaryList(responseBeneficiary.data);
            } catch (error) {
              console.error('Error fetching beneficiary details:', error);
            }
          };
          fetchBeneficiaryDetails();
        }, [token]);

       
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg text-white">Beneficiaries</h3>
      <ul>
        {beneficiaryList.map((beneficiary, index) => (
          <li key={index} className="mt-2 text-white">
            <div>{beneficiary.name}</div>
            <div>{beneficiary.emailId}</div>
            <div>{beneficiary.accountNumber}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BeneficiaryData;
