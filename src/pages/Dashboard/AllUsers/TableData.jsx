import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { Select } from 'flowbite-react';

const TableData = ({ user, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const [ Role , SetRole] = useState()
    const { name, avatar, email, role, status } = user
    const { mutateAsync } = useMutation({
        mutationFn: async (status) => {
            await axiosSecure.put(`/user/${email}/?status=${status}&role=${Role}`)
        },
        onSuccess: () => {
            refetch()
            SetRole (null)
            Swal.fire({
                title: "Successful !",
                icon: "success"
            });
        }
    })
    const handleAction = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await mutateAsync(true)
            }
        });
    }
    const handleRole = async(event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const Role =await selectedOption.getAttribute('data-id');
        SetRole(Role)
       await mutateAsync(false)

      
    }
    return (
        <tr>
            <td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div class="inline-flex items-center gap-x-3">
                    <div class="flex items-center gap-x-2">
                        <img class="object-cover w-10 h-10 rounded-full" src={avatar} alt="user image" />
                        <div>
                            <h2 class="font-medium text-gray-800 dark:text-white ">{name}</h2>
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                    <span class={`h-1.5 w-1.5 rounded-full ${status ? " bg-emerald-500" : "bg-red-800"}`}></span>

                    <h2 class={`text-sm font-normal  ${status ? " text-emerald-500" : "text-red-800"}`}>{status ? "Active" : "Blocked"}</h2>
                </div>
            </td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{role}</td>
            <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{email}</td>
            <td class="px-4 py-4 text-sm whitespace-nowrap">
                <div class="flex items-center gap-x-2">
                    <button onClick={handleAction} className='btn btn-accent'>{status ? "Block" : "Unblock"}</button>
                   
                    
                            <Select id="countries" onChange={handleRole}  defaultValue="Change Role" className='btn btn-success'>
                                <option aria-readonly defaultValue="change Role" disabled> Change Role</option>
                                <option data-id ="admin">Admin</option>
                                <option data-id ="volunteer"> Volunteer</option>
                                <option data-id ="donor">Donor</option>
                            </Select>
                </div>
            </td>

        </tr>
    );
};

export default TableData;