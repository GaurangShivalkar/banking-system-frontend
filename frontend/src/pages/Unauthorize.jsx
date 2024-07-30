import React from 'react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-800 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">401 - Unauthorized</h1>
        <p className="text-lg mb-8">You do not have permission to view this page.</p>
        <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default Unauthorized;
