import React from 'react';
import useGetOne from '../../../hooks/useGetOne';
import Spinner from '../../../Components/Share/Spinner';
import { FaUserSecret } from "react-icons/fa6";
import { BiSolidDonateBlood } from "react-icons/bi";

const Panel = () => {
    const {data}= useGetOne("/panel")
    if (!data) {
        return Spinner()
    }
    return (
        <div className='mx-10 flex flex-col lg:flex-row gap-10 '>
         
            <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full">
                <div className="flex items-start ">
                    <div
                        className=" grid size-20 mr-5 place-content-center rounded-full border-2 border-indigo-500"
                    >
                        <div className="flex items-center gap-1">
                        <FaUserSecret className='text-3xl text-lime-500 font-bold'/>
                        </div>
                    </div>
                    <div>
                        <strong
                            className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                        >
                            Episode #101
                        </strong>

                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                            Total Users
                        </h3>
                        <h1 className='text-2xl font-extrabold text-gray-900 ml-2'>{data.users}</h1>
                    </div>
                </div>
            </article>
            <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full">
                <div className="flex items-start ">
                    <div
                        className=" grid size-20 mr-5 place-content-center rounded-full border-2 border-indigo-500"
                    >
                        <div className="flex items-center gap-1">
                        <BiSolidDonateBlood className='text-4xl text-red-700  font-bold' />
                        </div>
                    </div>
                    <div>
                        <strong
                            className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                        >
                            Episode #102
                        </strong>

                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                            Total Donation Requests
                        </h3>
                        <h1 className='text-2xl font-extrabold text-gray-900'>{data?.donationRequests}</h1>
                    </div>
                </div>
            </article>
            <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 w-full">
                <div className="flex items-start ">
                    <div
                        className=" grid size-20 mr-5 place-content-center rounded-full border-2 border-indigo-500"       
                    >
                        <div className="flex items-center gap-1">
                            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                            <span className="h-4 w-0.5 rounded-full bg-indigo-500"></span>
                            <span className="h-6 w-0.5 rounded-full bg-indigo-500"></span>
                            <span className="h-8 w-0.5 rounded-full bg-indigo-500"></span>
                        </div>
                    </div>
                    <div>
                        <strong
                            className="rounded border border-indigo-500 bg-indigo-500 px-3 py-1.5 text-[10px] font-medium text-white"
                        >
                            Episode #101
                        </strong>

                        <h3 className="mt-4 text-lg font-medium sm:text-xl">
                            Total funds
                        </h3>
                        <h1 className='text-2xl font-extrabold text-gray-900'>{data?.totalFund} ($)</h1>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default Panel;