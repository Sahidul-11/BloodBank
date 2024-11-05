import React from 'react';
import Sidebars from '../Components/Dashboard/Sidebar/Sidebars';
import { Outlet } from 'react-router-dom';

const DashboardLayOut = () => {
    return (
        <div className=" relative  md:flex">
            <div className=" absolute lg:relative min-h-full left-0 top-0 lg:w-1/4 z-50">
                <Sidebars />
            </div>

            <div className="w-full lg:w-3/4 "> 
                <Outlet />
            </div>
        </div>

    );
};

export default DashboardLayOut;