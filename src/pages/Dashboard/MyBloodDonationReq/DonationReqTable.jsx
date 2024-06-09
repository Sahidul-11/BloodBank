import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useDelete from '../../../hooks/useDelete';
import { Button, Modal } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DonationReqTable = ({ req, refetch }) => {
    const axiosSecure = useAxiosSecure()
    const { handleDelete } = useDelete()
    const [openModal, setOpenModal] = useState(false);
    const { _id, requesterName, requesterEmail, recipientName, hospitalName, message, address, dateTime, BloodGroup, division, district, upazila, status } = req
    const [Date, time] = dateTime.split("T")
    const handleStatus = (changeStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${changeStatus} it!`
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`/donationReq/${requesterEmail}`, { changeStatus, _id })
                    .then(result => {
                        if (result) {
                            refetch()
                            Swal.fire({
                                title: `${changeStatus} !`,
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <tr className='text-gray-200'>
            <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap ">
                <div>
                    <span className="block text-sm font-medium">{recipientName}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div> <span className="block text-sm font-medium">{upazila} , {district}</span>
                    <span className="block text-sm font-medium">{division}</span>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className="block text-sm font-medium">Date : {Date}</span>
                <span className="block pt-3 text-sm font-medium">Time : {time}</span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap capitalize">
                <div>{status} {status === "pending" && "..."}</div>
                <div className={`flex ${status === "inprogress" ? "visible" : "hidden"} gap-4 pt-5`}>
                    <button onClick={() => handleStatus("done")} className='btn btn-success btn-sm'>Done</button>
                    <button onClick={() => handleStatus("cancel")} className='btn btn-warning btn-sm'>Cancel</button>
                </div>

            </td>
            <td className=" px-6 whitespace-nowrap">
                <Link to={`/dashboard/my-donation-requests/${_id}`}>
                    <button className="btn btn-sm btn-warning py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                        Edit
                    </button>
                </Link>

                <button onClick={() => handleDelete(`/donationReq/${_id}`, refetch)} className="py-2 bg-gray-50  mx-5 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-transparent rounded-lg">
                    Delete
                </button>
                <button onClick={() => setOpenModal(true)} className='btn btn-ghost btn-sm bg-rose-700'>View details</button>
                <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Requester Name : <span className='bg-green-500 p-2 rounded-xl bg-opacity-80'>{requesterName}</span></Modal.Header>
                    <Modal.Body>
                        <div className="space-y-3">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">
                                Requester email : {requesterEmail}
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 ">Recipient name :{recipientName}</p>
                            <p className="font-bold leading-relaxed text-gray-500 dark:text-gray-400">Recipient Blood Group : <span className='font-bold text-red-700'>{BloodGroup}</span></p>
                            <div className="flex font-semibold gap-10">
                                <p>Date :  {Date}</p>
                                <p>Time :  {time}</p>
                            </div>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Medical Hospital : <span className='font-bold '>{hospitalName}</span></p>
                            <hr />
                            <p className='font-bold'>Address :</p>
                            <div className='flex gap-4'>
                                <p>{upazila},</p>
                                <p>{district}</p>
                                <p>{division},</p>

                            </div>
                            <p>{address}</p>
                            <hr />
                            <p><span className='text-xl font-bold'>Message :</span> {message}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => setOpenModal(false)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </td>
        </tr>
    );
};

export default DonationReqTable;