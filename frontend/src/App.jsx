import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import Captainlogin from './pages/Captainlogin';
import Home from './pages/Home';
import UserProtectWrapper from './pages/UserProtectWrapper';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtectWrapper from './pages/CaptainProtectWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './pages/Riding';
import CaptainRiding from './pages/CaptainRiding';
import AboutUs from './pages/AboutUs';
import 'remixicon/fonts/remixicon.css'
import HelpCenter from './pages/HelpCenter';
import LogOut from './pages/LogOut';
import CaptainDashboard from './pages/CaptainDashboard';
import ActiveRide from './pages/ActiveRide';
import Earnings from './pages/Earnings';
import Ratings from './pages/Ratings';
import TripHistory from './pages/TripHistory';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captain-riding' element={<CaptainRiding />} />
       
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/dashboard" element={<CaptainDashboard />} />
        <Route path="/active-ride" element={<ActiveRide />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/trip-history" element={<TripHistory />} />
        <Route path="/notifications" element={<Notifications />} />
        
        <Route path="/settings" element={<Settings />} />
        <Route path='/home' element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
          <Route path='/user/logout'element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
           } />
           <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />

        </Routes>
        </div>
  )
}

export default App;