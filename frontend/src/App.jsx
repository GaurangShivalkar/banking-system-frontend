
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
import ConfirmTransaction from './components/ConfirmTransaction';
import BeneficiaryPage from './pages/beneficiary';
import HomePage from './pages/home';

import { ProtectedRoute } from './ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/kyc" element={<KycPage />}/>
        <Route path="/createAccount" element={<CreateAccountPage />}/>
        <Route path="/registration" element={<RegistrationPage />}/>
        <Route path="/otp" element={<OtpPage />}/>
       
        <Route exact path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />}/>

        <Route element={<ProtectedRoute/>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/accounts" element={<AccountPage/>} />
          <Route path="/transactions" element={<TransactionPage/>} />  
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/confirmTransactions" element={<ConfirmTransaction />}/>
          <Route path="/beneficiary" element={<BeneficiaryPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


