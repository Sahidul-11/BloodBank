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
        <div>
            <Title header={"All Blood Donation Requests"}></Title>
            <div className='flex justify-center items-center gap-5'>
                <h1 className='text-4xl font-bold'>Sort:</h1>
                <select onChange={handleRole} className="select w-full max-w-xs bg-white text-slate-950">
                    <option disabled selected>Pick one</option>
                    <option data-id=" ">All</option>
                    <option data-id="pending">pending</option>
                    <option data-id="inprogress">inprogress</option>
                    <option data-id="done">done</option>
                    <option data-id="canceled">canceled</option>

                </select>
            </div>
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="items-start justify-between md:flex">
                    <div className="max-w-lg">
                        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                            recipient name
                        </h3>

                    </div>
                    <div className="mt-3 md:mt-0">
                        <a
                            href="javascript:void(0)"
                            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                        >
                            Add member
                        </a>
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
        </div>
    );
};

export default AllBloodDonation;