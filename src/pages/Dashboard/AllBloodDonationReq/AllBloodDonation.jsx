import React, { useState } from 'react';
import Title from '../../../Components/Share/Title';
import useGetOne from '../../../hooks/useGetOne';
import TableRow from './TableRow';

const AllBloodDonation = () => {
 const [status , setStatus]=useState()
    const handleRole = async (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const Role = await selectedOption.getAttribute('data-id');
        setStatus(Role)
    }
    const { data ,refetch } = useGetOne(`/allRequest/?status=${status}`)
    if (!data) {
      return  
    }
    return (
        <div className='overflow-hidden'>
            <Title header={"All Blood Donation Requests"}></Title>
            <div className='flex justify-center items-center gap-5 mt-7'>
                <h1 className='text-4xl font-bold '>Sort:</h1>
                <select onChange={handleRole} className="select w-full max-w-xs bg-white text-slate-950">
                    <option disabled selected>Pick one</option>
                    <option data-id=" ">All</option>
                    <option data-id="pending">pending</option>
                    <option data-id="inprogress">inprogress</option>
                    <option data-id="done">done</option>
                    <option data-id="canceled">canceled</option>

                </select>
            </div>
            <div className="max-w-screen-xl mx-auto mb-12 px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            recipient name
                        </h3>

                    </div>
                </div>
                <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                    <table className="w-full table-auto text-sm text-left">

                        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                            <tr>
                                <th className="py-3 px-6"> Recipient name</th>
                                <th className="py-3 px-6"> Recipient location</th>
                                <th className="py-3 px-6"> Donation date & time</th>
                                <th className="py-3 px-6">Donation status</th>
                                <th className="py-3 px-6">Action</th>

                            </tr>
                        </thead>
                        <tbody className="text-gray-600 divide-y">
                            {

                                data.map(req => <TableRow key={req._id} req={req} refetch={refetch}></TableRow>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="flex items-center justify-center mt-6">
                    <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                        </svg>

                        <span>
                            previous
                        </span>
                    </a>

                    <div class="items-center hidden lg:flex gap-x-3">
                        <a href="#" class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                        <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                        <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                        <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                        <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                        <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                        <a href="#" class="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                    </div>

                    <a href="#" class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                        <span>
                            Next
                        </span>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </a>
             </div>
        </div>
    );
};

export default AllBloodDonation;