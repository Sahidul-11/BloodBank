import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import useAuth from '../../../hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import useGetOne from '../../../hooks/useGetOne';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const ReqDetails = () => {
    const { id } = useParams()
    const axiosCommon = useAxiosCommon()
    const [divisions, setDivisions] = useState()
    const [districts, setDistrict] = useState()
    const [upo, setUpo] = useState()
    const { loading, setLoading} = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()



    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const recipientName = form.recipientName.value;
        const hospitalName = form.hospitalName.value;
        const message = form.message.value;
        const address = form.address.value;
        const dateTime = form.dateTime.value;
        const BloodGroup = form.BloodGroup.value;
        const division = form.division.value;
        const district = form.district.value;
        const upazila = form.upazila.value;

        const request = { recipientName, hospitalName, message, address, dateTime, BloodGroup, division, district, upazila,  }
        try {
            setLoading(true)
            await axiosSecure.put(`/donationReq/?id=${id}`, request)
            toast.success('successfully updated')
            navigate('/dashboard/my-donation-requests')
            setLoading(false)
            refetch()
        }
        catch (err) {
            setLoading(false)
            toast.error(err.message)

        }


    }
    
    useEffect(() => {
        axiosCommon.get("/division")
            .then(res => setDivisions(res.data))

    }, [])
    const getDis = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('data-id');
        axiosCommon.get(`/district/${id}`)
            .then(res => setDistrict(res.data))


    }
    const getUpozila = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('data-id');
        axiosCommon.get(`/upazila/${id}`)
            .then(res => setUpo(res.data))
    }
    
    const { data, refetch } = useGetOne(`/aDonationReq/${id}`)
    if(!data){
        return
    }
    const { requesterName, requesterEmail, recipientName, hospitalName, message, address, dateTime, BloodGroup, division, district, upazila } = data;

    return (
        <div>
            <div className="font-sans text-slate-800">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100  ">
                    <div className="relative w-9/12  md:w-2/3">
                        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label for="" className="block mt-3 text-3xl text-red-700 text-center font-semibold">
                                Update Blood Donation  request
                            </label>
                            <form onSubmit={handleSubmit} method="#" action="#" className="mt-10" >
                                <div className=" md:flex justify-between items-center gap-5">
                                    <div className='w-full'>
                                        <input type="text" defaultValue={requesterName} readOnly className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    </div>
                                    <div className="w-full">
                                        <input defaultValue={requesterEmail} readOnly className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    </div>
                                </div>-

                                <div className=" md:flex justify-between items-center gap-5 mt-7">
                                    <div className='w-full'>
                                        <input type="text" defaultValue={recipientName} name='recipientName' recipientName='' className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    </div>
                                    <div className="w-full">
                                        <input type="text" required name='hospitalName' defaultValue={hospitalName} className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                    </div>

                                </div>
                                <div className="md:flex justify-between items-center gap-5">
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>Select Blood Group</label>
                                        <select name='BloodGroup' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled selected>{BloodGroup}</option>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="AB">AB</option>
                                            <option value="AB">AB-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                        </select>
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>Select Date & time</label>
                                        <input type="datetime-local" defaultValue={dateTime} required name='dateTime' placeholder="Email address" className="mt-1 block  bg-black w-full border-none  text-white h-11 rounded-xl shadow-lg focus:ring-0" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>Division</label>
                                        <select name='division' onChange={getDis} className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled selected>{division}</option>
                                            {
                                                divisions && divisions.map(division => <option data-id={division.id} key={division.id} value={division?.name}>{division?.name}</option>)
                                            }

                                        </select>
                                    </div>
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>District</label>
                                        <select name='district' onChange={getUpozila} className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled selected>{district}</option>
                                            {
                                                districts && districts.map(district => <option data-id={district.id} key={district.id} value={district?.name}>{district?.name}</option>)
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className="mt-2 w-full">
                                    <label htmlFor="" className='text-xl font-semibold'>Upazila</label>
                                    <select name='upazila' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                        <option disabled selected>{upazila}</option>
                                        {
                                            upo && upo.map(thana => <option data-id={thana.id} key={thana.id} value={thana?.name}>{thana?.name}</option>)
                                        }
                                    </select>
                                </div>
                                <div className="md:flex justify-between items-center gap-5">
                                    <div>
                                        <label htmlFor="" className='text-xl font-semibold'>full address</label>
                                        <textarea placeholder="full address" defaultValue={address} name='address' className="textarea bg-transparent textarea-bordered border-slate-950 textarea-lg w-full max-w-xs" ></textarea>
                                    </div>
                                    <div>
                                        <label htmlFor="" className='text-xl font-semibold'>Message</label>
                                        <textarea defaultValue={message} placeholder="Message" name='message' className="textarea textarea-bordered bg-transparent border-slate-950 textarea-lg w-full max-w-xs" ></textarea>

                                    </div>



                                </div>




                                <div className="mt-7">
                                    <button type='submit' disabled={loading} className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        {loading ? <BeatLoader color="#36d7b7" /> : "Request"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReqDetails;