import React, { useState, useEffect } from "react";
import AdminTransactionList from "../../components/AdminComponents/AdminTransactionList";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";



const AdminTransactions = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <AdminTransactionList />
      </div>
    </div>
  );
};

export default AdminTransactions;
