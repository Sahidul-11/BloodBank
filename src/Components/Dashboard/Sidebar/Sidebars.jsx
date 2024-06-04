import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import { NavLink } from 'react-router-dom';


const Sidebars = () => {
    const [isOpen, setIsOpen] = useState(true)
    return (
        <div className='w-full'>
            <div className="drawer-content flex items-center justify-between px-2 py-0 lg:py-3 w-full lg:hidden">
                <h1 className='text-2xl font-bold lg:hidden'>BloodBank</h1>
                <label onClick={() => setIsOpen(!isOpen)} htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">{isOpen ? "Close drawer" : "Open drawer"}</label>

            </div>

            <Sidebar aria-label="Sidebar with logo branding example" className={`${isOpen ? "visible" : "hidden lg:visible"}`}>
                <Sidebar.Logo href="#" img="/favicon.svg" imgAlt="Flowbite logo">
                    Flowbite
                </Sidebar.Logo>
                <Sidebar.Items className='min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-60px)]'>
                    <Sidebar.ItemGroup>
                        <NavLink to="/dashboard">
                            <Sidebar.Item icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                        </NavLink>
                        <NavLink to="/dashboard/profile">
                            <Sidebar.Item icon={HiUser}>
                                Profile
                            </Sidebar.Item>
                        </NavLink>



                        <Sidebar.Item icon={HiViewBoards}>
                            Kanban
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiInbox}>
                            Inbox
                        </Sidebar.Item>

                        <Sidebar.Item href="#" icon={HiShoppingBag}>
                            Products
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiArrowSmRight}>
                            Sign In
                        </Sidebar.Item>
                        <Sidebar.Item href="#" icon={HiTable}>
                            Sign Up
                        </Sidebar.Item>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default Sidebars;