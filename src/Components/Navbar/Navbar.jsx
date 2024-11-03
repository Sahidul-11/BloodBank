import Hamburger from 'hamburger-react';
import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';


const Navbar = () => {
    const [isOpen, setOpen] = useState(false)
    const { user, logOut } = useAuth()
    const handleLogOut = () => {
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
    const link = <>

        <li className="flex">
            <NavLink to="/" className={({ isActive }) => (isActive ? 'flex items-center px-4  border-b-2 dark:border- text-violet-400 dark:text-violet-600 border-violet-400 dark:border-violet-600' : 'flex items-center px-4  border-b-2')} >Home</NavLink>
        </li>
        <li className="flex">
            <NavLink to="/pendingReq" className={({ isActive }) => (isActive ? 'flex items-center px-4  border-b-2 dark:border- text-violet-400 dark:text-violet-600 border-violet-400 dark:border-violet-600' : 'flex items-center px-4  border-b-2')}>Donation Requests</NavLink>
        </li>
        <li className="flex">
            <NavLink to="/blogs" className={({ isActive }) => (isActive ? 'flex items-center px-4  border-b-2 dark:border- text-violet-400 dark:text-violet-600 border-violet-400 dark:border-violet-600' : 'flex items-center px-4  border-b-2')} >Blogs</NavLink>
        </li>
        <li className="flex">
            <NavLink to="/funding" className={({ isActive }) => (isActive ? 'flex items-center px-4  border-b-2 dark:border- text-violet-400 dark:text-violet-600 border-violet-400 dark:border-violet-600' : 'flex items-center px-4  border-b-2')} > Funding</NavLink>
        </li>
    </>
    return (
        <header className=" pb-3 pt-1 bg-gray-800 dark:bg-gray-100 text-gray-100 dark:text-gray-800 w-full flex justify-center items-center ">
            <div className=" flex justify-between h-16 mx-2 md:mx-10 w-full">
                <div className="lg:hidden">
                    <div >
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <ul className={`menu bg-base-200 w-56 rounded-box -left-0 absolute ${isOpen ? "visible ease-in duration-300 " : "hidden"}`}>
                        <li>
                            <div className="flex justify-between items-center gap-4 md:gap-16">
                                <img src="https://i.ibb.co/vZfWNvd/985.jpg" alt="logo" className='rounded-3xl w-10 md:w-16' />
                                <h1 className='text-2xl font-bold'>BloodBank</h1>
                            </div>
                            <ul>
                                {link}
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className=" md:flex justify-between items-center gap-4 md:gap-16 hidden md:visible">
                    <img src="https://i.ibb.co/vZfWNvd/985.jpg" alt="logo" className='rounded-3xl w-10 md:w-16' />
                    <h1 className='text-3xl md:text-4xl font-bold'>BloodBank</h1>
                </div>
                <ul className="items-stretch hidden space-x-3 lg:flex">


                    {
                        link
                    }
                </ul>
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button">
                            <div className="avatar">
                                <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL} />
                                </div>
                            </div>
                        </div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-slate-800">
                            <li><Link to="/dashboard" className='btn btn-outline mb-8 text-xl'> Dashboard</Link></li>
                            <li onClick={handleLogOut}><button className='btn bg-red-600 hover:text-red-500 text-white rounded-lg'>Log Out</button></li>
                        </ul>
                    </div> : <div className="items-center flex-shrink-0 lg:flex">
                        <Link to="/logIn"> <button className="self-center px-8 py-3  ease-in-out duration-300 btn btn-outline mr-2 rounded-lg">Sign in</button></Link>
                        <Link to="/registration"> <button className="self-center px-8 py-3 font-semibold rounded bg-violet-400 dark:bg-violet-600 text-gray-900 dark:text-gray-50 ease-in-out duration-300">Register</button></Link>



                    </div>

                }


            </div>
        </header>
    );
};

export default Navbar;