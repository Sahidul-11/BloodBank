import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiShoppingBag, HiUser, } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { LuUsers2 } from 'react-icons/lu';
import useRole from '../../../hooks/useRole';
import { FaRegEdit } from 'react-icons/fa';


const Sidebars = () => {
    const { logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(true)
    const [role, isLoading] = useRole()
    const UserLogOut = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes,Log Out!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await logOut()
                Swal.fire({
                    title: "Logged Out!",
                    text: "Your file has been logged Out.",
                    icon: "success"
                });
            }
        });
    }
    if (isLoading) {
        return
    }
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
                        {
                            role === "admin" && <>
                                <NavLink to="/dashboard/all-users">
                                    <Sidebar.Item icon={LuUsers2}>
                                        All Users
                                    </Sidebar.Item>
                                </NavLink>
                            </>
                        }

                        <NavLink to="/dashboard/create-donation-request">
                            <Sidebar.Item icon={FaRegEdit}>
                               Create Donation Request
                            </Sidebar.Item>
                        </NavLink>
                        <Sidebar.Item href="#" icon={LuUsers2}>
                            Inbox
                        </Sidebar.Item>

                        <Sidebar.Item href="#" icon={HiShoppingBag}>
                            Products
                        </Sidebar.Item>
                        <div onClick={UserLogOut}>
                            <Sidebar.Item icon={HiArrowSmRight}>
                                Log Out
                            </Sidebar.Item>
                        </div>

                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
};

export default Sidebars;