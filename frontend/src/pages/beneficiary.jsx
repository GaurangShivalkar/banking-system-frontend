import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import axios from "../api/axiosConfig";
import BeneficiaryType from "../components/BeneficiaryType";

const BeneficiaryPage = () => {

    return (
        <div className="flex flex-col h-screen">
            <NavbarComponent />
            <div className="p-4 sm:ml-64"><BeneficiaryType /></div>
        </div>

    );
};

export default BeneficiaryPage;
