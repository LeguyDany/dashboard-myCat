import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import {ComposeDashboard} from './dashboard';
import {Login, Register} from './registration';

const ShowPage = () => {
    return(
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<ComposeDashboard />} />
            </Routes>
        </Router>
    )
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <ShowPage/>
);