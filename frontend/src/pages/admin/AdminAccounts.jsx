import React, { useState, useEffect } from "react";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";
import AdminAccountList from "../../components/AdminComponents/AdminAccountList";

const AdminAccounts = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <AdminAccountList />
      </div>
    </div>
  );
};

export default AdminAccounts;
