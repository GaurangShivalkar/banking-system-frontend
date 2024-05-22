import React,{useEffect} from 'react';
import NavbarComponent from '../components/NavbarComponent';
import axios from '../api/axiosConfig';
const DashboardPage = () => {

  return (
    <div className="flex flex-col h-screen">
      <NavbarComponent />
    </div>
  );
};

export default DashboardPage;
