import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Spinner from '../../../Components/Share/Spinner';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Title from '../../../Components/Share/Title';
import TableData from './TableData';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const AllUsers = () => {
    const [sort, setSort] = useState(' ')
    const { loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const handleRole = async (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const Role = await selectedOption.getAttribute('data-id');
        setSort(Role)
    }
    const { isPending, error, data, refetch } = useQuery({
        queryKey: ['users', loading, sort],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/?sort=${sort}`)
            return data
        }
    })

    if (isPending) {
        return Spinner()
    }
    if (!data) {
        return Spinner()
    }

    if (error) {
        return toast.error(error.message)
    }
    return (
        <div>
            <div>
                <Title header="All Users" title=" "></Title>
            </div>
            <div className='flex justify-center items-center gap-5'>
                <h1 className='text-4xl font-bold'>Sort:</h1>
                <select onChange={handleRole} className="select w-full max-w-xs bg-white text-slate-950">
                    <option disabled selected>Pick one</option>
                    <option data-id=" ">All</option>
                    <option data-id="true">Active</option>
                    <option data-id="false">Blocked</option>

                </select>
            </div>
            <section class="container px-4 mx-auto">
                <div class="flex items-center gap-x-3">
                    <h2 class="text-lg font-medium text-white">Total </h2>
                    <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{data.length} users</span>
                </div>

                <div class="flex flex-col mt-6 w-full ">
                    <div class=" sm:-mx-6 lg:-mx-8">
                        <div class=" min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div class=" border border-gray-200 bg-gray-50 dark:border-gray-700 md:rounded-lg overflow-x-auto">
                                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-x-auto">
                                    <thead class=" dark:bg-gray-800 w-full">
                                        <tr>
                                            <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div class="flex items-center gap-x-3">
                                                    <span>Name</span>
                                                </div>
                                            </th>

                                            <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button class="flex items-center gap-x-2">
                                                    <span>Status</span>
                                                </button>
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button class="flex items-center gap-x-2">
                                                    <span>Role</span>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                    </svg>
                                                </button>
                                            </th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>

                                            <th scope="col" class="px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400 text-center">Action</th>

                                        </tr>
                                    </thead>
                                    <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            data?.map((user) => <TableData key={user._id} user={user} refetch={refetch}></TableData>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-6">
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
            </section>

        </div>
    );
};

export default AllUsers;