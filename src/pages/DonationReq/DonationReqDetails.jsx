import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGetOne from '../../hooks/useGetOne';
import Spinner from '../../Components/Share/Spinner';
import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi";
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';


const DonationReqDetails = () => {
    const axiosSecure =useAxiosSecure()
    const {user} = useAuth()
    const { id } = useParams()
    const { data, refetch } = useGetOne(`/aDonationReq/${id}`)
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate()
    if (!data) {
        return Spinner()
    }
    console.log(data)
    const { _id, requesterName, requesterEmail, recipientName, hospitalName, message, address, dateTime, BloodGroup, division, district, upazila, status } = data
    const [Date, time] = dateTime.split("T")

    const handleDonate = async()=>{
        const email = user?.email
        const donorName= user?.displayName
        const donor ={donorName , email}
        try{
         await axiosSecure.put(`/donate/${_id}`, donor) 
         toast.success("successfully Done")
         navigate("/pendingReq") 

        }
        catch(err){
            toast.error(err.message)
        }
    }
    return (


        <div className="space-y-3 w-11/12 md:w-3/5 mx-auto my-10 bg-white p-8 rounded-2xl text-slate-900">
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400 ">
                Requester email : {requesterEmail}
            </p>
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400 ">Recipient name :{recipientName}</p>
            <p className="font-bold leading-relaxed text-gray-800 dark:text-gray-400">Recipient Blood Group : <span className='font-bold text-red-700'>{BloodGroup}</span></p>
            <div className="flex font-semibold gap-10">
                <p>Date :  {Date}</p>
                <p>Time :  {time}</p>
            </div>
            <p className="text-base leading-relaxed text-gray-800 dark:text-gray-400">Medical Hospital : <span className='font-bold '>{hospitalName}</span></p>
            <hr />
            <p className='font-bold text-gray-800'>Address :</p>
            <div className='flex gap-4 text-gray-800'>
                <p>{upazila},</p>
                <p>{district}</p>
                <p>{division},</p>

            </div>
            <p>{address}</p>
            <hr />
            <p><span className='text-xl font-bold'>Message :</span> {message}</p>

            <div className="mt-8 flex space-x-3 lg:mt-6 justify-center items-center gap-4">
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                    Go Back
                </button>
                <Button onClick={() => setOpenModal(true)}>Donate</Button>


            </div>
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to donate?
                        </h3>
                        <form action="" className='my-10'>
                            <div className="mt-2">
                                <label htmlFor="" className='text-xl font-semibold mb-4'>Your Name</label>
                                <input type="text" name='image' readOnly defaultValue={user?.displayName} className="mt-1 cursor-not-allowed block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>
                            <div className="mt-2">
                                <label htmlFor="" className='text-xl font-semibold mb-4'>Your Email</label>
                                <input type="email" name='image' readOnly defaultValue={user?.email} className="mt-1 cursor-not-allowed block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>
                        </form>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDonate}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>



    );
};

export default DonationReqDetails;