import React from 'react';
import Sidebars from '../Components/Dashboard/Sidebar/Sidebars';
import { Outlet } from 'react-router-dom';

const DashboardLayOut = () => {
    return (
        <div className=" relative  md:flex">
            <div className=" absolute lg:relative  left-0 top-0 lg:1/4 z-50">
                <Sidebars />
            </div>

            <div className="w-full "> 
                <Outlet />
            </div>
        </div>

    );
};

export default DashboardLayOut;