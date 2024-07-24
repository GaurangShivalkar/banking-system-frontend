import React from "react";
import AdminNavbarComponent from "../../components/AdminComponents/AdminNavbar";
import AdminBeneficiaryList from "../../components/AdminComponents/AdminBeneficiaryList";

const AdminBeneficiaries = () => {
  return (
    <div>
      <AdminNavbarComponent />
      <div className="p-4 sm:ml-64">
        <AdminBeneficiaryList />
      </div>
    </div>
  );
};

export default AdminBeneficiaries;
