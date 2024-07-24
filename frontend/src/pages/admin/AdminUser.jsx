import React, { useState, useEffect } from "react";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";
import AdminUserList from "../../components/AdminComponents/AdminUserList";

const AdminUsers = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <AdminUserList/>
      </div>
    </div>
  );
};

export default AdminUsers;
