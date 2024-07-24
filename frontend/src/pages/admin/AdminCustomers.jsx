import React, { useState, useEffect } from "react";
import AdminCustomerList from "../../components/AdminComponents/AdminCustomerList";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";



const AdminCustomers = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <AdminCustomerList />
      </div>
    </div>
  );
};

export default AdminCustomers;
