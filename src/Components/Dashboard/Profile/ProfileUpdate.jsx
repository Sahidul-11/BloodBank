import React, { useEffect, useState } from 'react';
import useAxiosCommon from '../../../hooks/useAxiosCommon';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../Share/Spinner';
import useAuth from '../../../hooks/useAuth';

const ProfileUpdate = () => {
    const [divisions, setDivisions] = useState()
    const [districts, setDistrict] = useState()
    const [upo, setUpo] = useState()
    const [a ,setA] =useState()
    const axiosCommon = useAxiosCommon()
    const { updateUserProfile, loading, setLoading, user } = useAuth()
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()


    const { isPending, isError, data, error } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/user/${user?.email}`)
          return data
            
        }
    })


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const BloodGroup = form.BloodGroup.value;
        const division = form.division.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const image = form.image.files[0];
        const formData = new FormData()
        formData.append('image', image)
        try {
            setLoading(true)
            if (image) {
                const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KAY}`,
                    formData)
                const avar = data?.data?.display_url;
                const updateInfo = { name, avatar: avar, BloodGroup, division, district, upazila, }
                await updateUserProfile(name, avar)

                await axiosSecure.put(`/user/${user?.email}`, updateInfo)
                    .then(res => console.log(res.data))
                toast.success("Successfully Sign up")
                navigate("/dashboard/profile")
                setLoading(false)
            }
            else { 
                const avatar = user.photoURL;
                const updateInfo = { name, avatar, BloodGroup, division, district, upazila, }
                await updateUserProfile(name, avatar)

                await axiosSecure.put(`/user/${user?.email}`, updateInfo)
                    .then(res => console.log(res.data))
                toast.success("Successfully Saved Changes")
                navigate("/dashboard/profile")
                setLoading(false)
            }


        }
        catch (err) {
            setLoading(false)
            console.log(err)
            toast.error(err?.message)
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
    if (isPending) {
        return Spinner()
    }

    if (isError) {
        return toast.error(error.message)
    }
    const { name, email, BloodGroup, division, district, upazila } = data;

    return (
        <div>
            <div className="font-sans text-slate-800">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                    <div className="relative w-9/12  md:w-1/3">
                        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label for="" className="block mt-3 text-3xl text-gray-700 text-center font-semibold">
                                Update Profile
                            </label>
                            <form onSubmit={handleSubmit} method="#" action="#" className="mt-10">
                                <div>
                                    <input type="text" defaultValue={name} placeholder="Full Name" name='name' className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-7">
                                    <input type="email" disabled defaultValue={email} name='email' placeholder="Email address" className="mt-1 block w-full border-none bg-gray-100 h-11 cursor-not-allowed rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="" className='text-xl font-semibold'>Your Profile picture</label>
                                    <input type="file" name='image' placeholder="Photo URL" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-2 w-full">
                                    <label htmlFor="" className='text-xl font-semibold'>Select your Blood Group</label>
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
                                <div className="mt-7">
                                    <button type='submit' className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        {loading ? <BeatLoader color="#36d7b7" /> : "Save Changes"}
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

export default ProfileUpdate;