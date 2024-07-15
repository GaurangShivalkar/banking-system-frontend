import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';


import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import OtpPage from './pages/otp';
import KycPage from './pages/kyc';

import { ProtectedRoute } from './ProtectedRoute';

import DashboardPage from './pages/dashboard';
import CreateAccountPage from './pages/createAccount';
import AccountPage from './pages/account';
import TransactionPage from './pages/transaction';
import ProfilePage from './pages/profile';
import ConfirmTransaction from './components/ConfirmTransaction';
import BeneficiaryPage from './pages/beneficiary';
import HomePage from './pages/home';
import PaymentPage from './pages/payment';

import Admin from './pages/admin/Admin';
import AdminAccounts from './pages/admin/AdminAccounts';
import AdminTransactions from './pages/admin/AdminTransactions';
import AdminBeneficiaries from './pages/admin/AdminBeneficiaries';
import AdminBranches from './pages/admin/AdminBranches';
import AdminCustomers from './pages/admin/AdminCustomers';
import AdminUsers from './pages/admin/AdminUser';
import Unauthorize from './pages/Unauthorize';

export default function App() {
  //setIsLoggedIn={setIsLoggedIn} startSessionTimer={startSessionTimer}
  
      // { setIsLoggedIn, startSessionTimer }
      // setIsLoggedIn(true);
      // startSessionTimer();

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [logoutTimer, setLogoutTimer] = useState(null);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     startSessionTimer();
  //   }

  // }, [isLoggedIn]);

  // const startSessionTimer = () => {
  //   const timerId = setTimeout(() => {
  //     alert('Session expired. You will be logged out.');
  //     handleLogout();
  //   }, 0.5* 60 * 1000); // 3 minutes in milliseconds

  //   setLogoutTimer(timerId);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('customerId');
  //   window.location.reload();
  // };


  return (
    <BrowserRouter>
      <Routes>

        <Route path="/kyc"element={<KycPage />}/>

        {/* <Route path="/createAccount" element={<div><Stepper /><CreateAccountPage /></div>}/>
        <Route path="/register" element={<div><Stepper /><RegistrationPage /></div> }/>
        <Route path="/otp" element={<div><Stepper /><OtpPage /></div>}/> */}

        <Route path="/createAccount" element={<CreateAccountPage />}/>
        <Route path="/registration" element={<RegistrationPage />}/>
        <Route path="/otp" element={<OtpPage />}/>
        <Route exact path="/login" element={<LoginPage/>} />
        <Route path="/" element={<HomePage />}/>
        <Route path="/unauthorize" element={<Unauthorize />} />
        
        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/accounts" element={<AccountPage/>} />
          <Route path="/transactions" element={<TransactionPage/>} />  
          <Route path='/payment' element={<PaymentPage/>}/>
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/confirmTransactions" element={<ConfirmTransaction />}/>
          <Route path="/beneficiary" element={<BeneficiaryPage/>}/>
        </Route>

        <Route element={<ProtectedRoute isAdminRoute={true}/>}>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/adminAccounts" element={<AdminAccounts/>}/>
          <Route path="/adminTransactions" element={<AdminTransactions/>}/>
          <Route path="/adminBeneficiaries" element={<AdminBeneficiaries/>}/>
          <Route path="/adminBranches" element={<AdminBranches/>}/>
          <Route path="/adminCustomers" element={<AdminCustomers/>}/>
          <Route path="/adminUsers" element={<AdminUsers/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}