import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import NavbarComponent from '../components/NavbarComponent';
import PaymentAlt from '../components/paymentAlt';

const PaymentPage = () => {
  const [transactionMethod, setTransactionMethod] = useState('');
  const [transactionStatus, setTransactionStatus] = useState('');
  const [description, setDescription] = useState('');
  const [sourceAccountId, setSourceAccountId] = useState('');
  const [destinationAccountId, setDestinationAccountId] = useState('');
  const [amount, setAmount] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const transactionData = {
      transactionMethod: transactionMethod,
      transactionStatus: transactionStatus,
      description: description,
      
      sourceAccountId: sourceAccountId,
      
      destinationAccountId: destinationAccountId,
    
      customer: {
        customerId: "666996"
      },
      amount: amount
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post('/api/transactions/makeTransaction',
        transactionData, {headers:{Authorization: `Bearer ${token}` }})
      
      // Handle success scenario
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div >
    <NavbarComponent />
    <div className="p-4 sm:ml-64">
    <PaymentAlt />
    </div>
    </div> 
  );
};

export default PaymentPage;
