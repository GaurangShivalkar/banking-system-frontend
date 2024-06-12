import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "../api/axiosConfig";
import BeneficiaryType from "../components/BeneficiaryType";

const BeneficiaryPage = () => {

    return (
        <div className="flex h-screen">
            <NavbarComponent />
            <div className="sm:ml-64 p-4"><BeneficiaryType /></div>
        </div>

    );
};

export default BeneficiaryPage;
