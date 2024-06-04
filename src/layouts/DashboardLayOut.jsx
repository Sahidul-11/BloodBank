import React from 'react';
import Sidebars from '../Components/Dashboard/Sidebar/Sidebars';
import { Outlet } from 'react-router-dom';

const DashboardLayOut = () => {
    return (
        <div className=' lg:flex'>
            <div><Sidebars></Sidebars></div>
            <div className='w-full'><Outlet></Outlet></div>

        </div>
    );
};

export default DashboardLayOut;