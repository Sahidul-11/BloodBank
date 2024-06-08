import React from 'react';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import useUser from '../../../hooks/useUser';

const Profile = () => {
    const {data}=useUser()
     const {name ,avatar, email ,BloodGroup,division, district , upazila , role} = data;
    return (
        <div>
            <div  className="flex relative flex-col justify-center p-6 shadow-md rounded-xl sm:px-12  bg-gray-900 dark:bg-gray-50  text-gray-100 dark:text-gray-800">
          
            <div className='absolute right-5 lg:right-28 top-5 lg:top-32'> <Link to="/dashboard/profile/update" ><Button className='btn'>Edit</Button></Link></div>

                <img src={avatar} alt="" className="w-32 h-32 mx-auto rounded-full bg-gray-500  dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y divide-gray-700 dark:divide-gray-300  ">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{name}</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{role}</span>
                    </div>
                  
                </div>
                <div className="font-sans text-slate-800 mt-10">
                    <div className="relative  flex flex-col sm:justify-center items-center  bg-gray-900 dark:bg-gray-50">
                        <div className="relative ">
                            <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                            <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                            <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                                <label for="" className="block mt-3 text-3xl text-gray-700 text-center font-semibold">
                                 Your Profile Information
                                </label>
                                <form method="#" action="#" className="mt-10">
                                    <div>
                                        <input type="text" disabled defaultValue={name} placeholder="Full Name" name='name' className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    </div>
                                    <div className="mt-7">
                                        <input disabled defaultValue={email} type="email" required name='email' placeholder="Email address" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    </div>
                                  
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>Blood Group</label>
                                        <select  name='BloodGroup' aria-readonly className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled selected>{BloodGroup}</option>
                                           
                                        </select>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="mt-2 w-full">
                                            <label htmlFor="" className='text-xl font-semibold'>Division</label>
                                            <select name='division' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                                <option disabled selected>{division}</option>
                                              

                                            </select>
                                        </div>
                                        <div className="mt-2 w-full">
                                            <label htmlFor="" className='text-xl font-semibold'>District</label>
                                            <select name='district' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                                <option disabled selected>{district}</option>
                                             
                                            </select>
                                        </div>

                                    </div>
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>Upazila</label>
                                        <select name='upazila' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled selected>{upazila}</option>
                                          
                                        </select>
                                    </div>
                                  
                                 
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;