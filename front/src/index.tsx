// ============================================= General imports =============================================
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import {ComposeDashboard} from './dashboard';
import {Login, Register, Logout} from './registration';
import {Services} from "./services";
import {TwitterLogin} from "./widgets/twitterLogin"

// ============================================= Components =============================================
// ---------------------------------- Routes ----------------------------------
const ShowPage = () => {
    return(
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/dashboard" element={<ComposeDashboard />} />
                <Route path="/services" element={<Services />} />
                <Route path="/twitterLogin" element={<TwitterLogin />} />
            </Routes>
        </Router>
    )
};

// ---------------------------------- Rendering ----------------------------------
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ShowPage/>
);