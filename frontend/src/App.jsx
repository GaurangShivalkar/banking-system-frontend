
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import OtpPage from './pages/otp';
import KycPage from './pages/kyc';
import DashboardPage from './pages/dashboard';
import CreateAccountPage from './pages/createAccount';
import AccountPage from './pages/account';
import TransactionPage from './pages/transaction';
import ProfilePage from './pages/profile';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/registration" element={<RegistrationPage />}/>
        <Route path="/createAccount" element={<CreateAccountPage />}/>
        <Route path="/otp" element={<OtpPage />}/>
        <Route path="/kyc" element={<KycPage />}/>
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/accounts" element={<AccountPage/>} />
        <Route path="/transactions" element={<TransactionPage/>} />  
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </BrowserRouter>
  )
}


