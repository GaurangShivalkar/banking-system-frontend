import React from "react";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";

const Admin = () => {

    return (
      <div >
        <AdminNavbarComponent/>
        <div className="p-4 sm:ml-64">
            <h1>Welcome to admin page</h1>
        </div>
      </div>
  
    );
  };
  
  export default Admin;