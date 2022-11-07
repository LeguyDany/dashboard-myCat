import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './index.css';
import {SideNav} from './navigation';
import {Login} from './registration';

const ShowPage = () => {
    return(
        <Router>
            <Routes>
                <Route path="/register" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<SideNav />} />
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