import React from 'react';
import Sidebar from '../Components/Dashboard/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const DashboardLayOut = () => {
    return (
        <div>
            <div><Sidebar></Sidebar></div>
            <div><Outlet></Outlet></div>

        </div>
    );
};

export default DashboardLayOut;