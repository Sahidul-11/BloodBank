import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';

const Registration = () => {
    const [divisions, setDivisions] = useState()
    const [districts, setDistrict] = useState()
    const [upo, setUpo] = useState()
    const axiosCommon = useAxiosCommon()
    const { createUser, updateUserProfile, loading, setLoading,user } = useAuth()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const password = form.password.value;
        const BloodGroup = form.BloodGroup.value;
        const division = form.division.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const confirmPassword = form.confirmPassword.value;
        const email = form.email.value;
        const image = form.image.files[0];
        const role = "donor"
        const status = true ;
        const formData = new FormData()
        formData.append('image', image)

        try {
            if (password !== confirmPassword) {
               return toast.error("Confirm password Does not match") 
            }
            setLoading(true)
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KAY}`,
                formData
            )
            const avatar =data?.data?.display_url
            await createUser(email, password)
            await updateUserProfile(name, data.data.display_url)
            const User = {name ,avatar, email ,BloodGroup,division, district , upazila , role,status}
            await axiosCommon.post("/user", User )
            .then(res=>console.log(res.data))
            toast.success("Successfully Sign up")
            navigate("/")
            setLoading(false)

        }
        catch (err) {
            setLoading(false)
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
    return (
        <div>
            <div className="font-sans text-slate-800">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                    <div className="relative w-9/12  md:w-1/3">
                        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label for="" className="block mt-3 text-3xl text-gray-700 text-center font-semibold">
                                Sign Up
                            </label>
                            <form onSubmit={handleSubmit} method="#" action="#" className="mt-10">
                                <div>
                                    <input type="text" placeholder="Full Name" name='name' className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-7">
                                    <input type="email" required name='email' placeholder="Email address" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="" className='text-xl font-semibold'>Your Profile picture</label>
                                    <input type="file" name='image' placeholder="Photo URL" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-2 w-full">
                                    <label htmlFor="" className='text-xl font-semibold'>Select your Blood Group</label>
                                    <select name='BloodGroup' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                        <option disabled selected>What is Blood group?</option>
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
                                            <option disabled selected>What is your Division ?</option>
                                            {
                                                divisions && divisions.map(division => <option data-id={division.id} key={division.id} value={division?.name}>{division?.name}</option>)
                                            }

                                        </select>
                                    </div>
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>District</label>
                                        <select name='district' onChange={getUpozila} className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled selected>What is your district?</option>
                                            {
                                                districts && districts.map(district => <option data-id={district.id} key={district.id} value={district?.name}>{district?.name}</option>)
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className="mt-2 w-full">
                                    <label htmlFor="" className='text-xl font-semibold'>Upazila</label>
                                    <select name='upazila' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                        <option disabled selected>What is Upazila</option>
                                        {
                                            upo && upo.map(thana => <option data-id={thana.id} key={thana.id} value={thana?.name}>{thana?.name}</option>)
                                        }
                                    </select>
                                </div>

                                <div className="mt-7">
                                    <input type="password" name='password' required placeholder="Enter password" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />


                                </div>
                                <div className="mt-7">
                                    <input type="password" name='confirmPassword' required placeholder="Confirm password" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />

                                    {/* <p className=' text-red-700'>{error}</p> */}
                                </div>
                                <div className="mt-7">
                                    <button type='submit' className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        {loading ? <BeatLoader color="#36d7b7" /> : "Register"}
                                    </button>
                                </div>
                                <div className="mt-7">
                                    <div className="flex justify-center items-center">
                                        <label className="mr-2" > have You Already Account?</label>
                                        <Link to="/logIn" className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                            Sing in Here
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;