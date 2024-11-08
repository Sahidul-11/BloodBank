import React, { useState } from 'react';
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiShoppingBag, HiUser, } from "react-icons/hi";
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { LuUsers2 } from 'react-icons/lu';
import useRole from '../../../hooks/useRole';
import { FaHome, FaRegEdit } from 'react-icons/fa';
import { TiSortAlphabetically } from 'react-icons/ti';
import { FaCodePullRequest, FaPenClip } from 'react-icons/fa6';
import Hamburger from 'hamburger-react';


const Sidebars = () => {
    const { logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
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
               setIsOpen(!isOpen)
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
        <div className='w-full float-left'>
            <div className="drawer-content flex items-center justify-start px-2 py-0 lg:py-3 w-full lg:hidden">
                <Hamburger toggled={isOpen} toggle={setIsOpen} />

            </div>

            <Sidebar
                aria-label="Sidebar with logo branding example"
                className={`w-full ${isOpen ? "block" : "hidden"} lg:block`}
            >
                <div className="flex justify-center items-center gap-4 ">
                    <img src="https://i.ibb.co/vZfWNvd/985.jpg" alt="logo" className='rounded-3xl w-16 md:w-20' />
                    <h1 className='text-3xl md:text-3xl font-bold'>BloodBank</h1>
                </div>
                <Sidebar.Items className='min-h-[calc(100vh-150px)] lg:min-h-[calc(100vh-60px)] w-full'>
                    <Sidebar.ItemGroup>
                        <NavLink to="/"
                        onClick={()=>setIsOpen(!isOpen)}
                        >
                            <Sidebar.Item icon={FaHome}>
                                Home
                            </Sidebar.Item>
                        </NavLink>
                        <NavLink to="/dashboard"
                         onClick={()=>setIsOpen(!isOpen)}
                        >
                            <Sidebar.Item icon={HiChartPie}>
                                Dashboard
                            </Sidebar.Item>
                        </NavLink>
                        <NavLink to="/dashboard/profile"
                         onClick={()=>setIsOpen(!isOpen)}
                        >
                            <Sidebar.Item icon={HiUser}>
                                Profile
                            </Sidebar.Item>
                        </NavLink>
                        <NavLink to="/dashboard/my-donation-requests">
                            <Sidebar.Item icon={TiSortAlphabetically}>
                                My Blood Donation Requests
                            </Sidebar.Item>
                        </NavLink>
                        {
                            role === "admin" && <>
                                <NavLink to="/dashboard/all-users"
                                 onClick={()=>setIsOpen(!isOpen)}
                                >
                                    <Sidebar.Item icon={LuUsers2}>
                                        All Users
                                    </Sidebar.Item>
                                </NavLink>
                            </>
                        }
                        {
                            role === "admin" || role === 'volunteer' ? <>

                                <NavLink to="/dashboard/all-blood-donation-request"
                                 onClick={()=>setIsOpen(!isOpen)}
                                >
                                    <Sidebar.Item icon={FaCodePullRequest}>
                                        All Blood Donation Requests
                                    </Sidebar.Item>
                                </NavLink>
                                <NavLink to="/dashboard/content-management"
                                 onClick={()=>setIsOpen(!isOpen)}
                                >
                                    <Sidebar.Item icon={FaPenClip}>
                                        Content Management
                                    </Sidebar.Item>
                                </NavLink>
                            </> : ''
                        }

                        <NavLink to="/dashboard/create-donation-request"
                         onClick={()=>setIsOpen(!isOpen)}
                        >
                            <Sidebar.Item icon={FaRegEdit}>
                                Create Donation Request
                            </Sidebar.Item>
                        </NavLink>
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