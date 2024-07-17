import React from 'react';

const SuccessComponent = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-16 h-16 text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Payment Successful!</h2>
        <button
          onClick={onClose}
          className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-gray-800 focus:outline-none focus:ring focus:border-blue-300"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessComponent;
