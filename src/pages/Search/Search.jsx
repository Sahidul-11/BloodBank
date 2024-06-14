import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import { data } from 'autoprefixer';

const Search = () => {
    const [searchData, setSearchData] = useState([])
    const [divisions, setDivisions] = useState()
    const [districts, setDistrict] = useState()
    const [upo, setUpo] = useState()
    const axiosCommon = useAxiosCommon()
    const { loading, setLoading } = useAuth()
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const BloodGroup = encodeURIComponent(form.BloodGroup.value);
        const division = form.division.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const role = "donor"
        console.log(BloodGroup)
        try {

            setLoading(true)
            await axiosCommon.get(`/search/?role=${role}&BloodGroup=${BloodGroup}&division=${division}&district=${district}&upazila=${upazila}`)
                .then( res => set(res.data))
               
            setLoading(false)

        }
        catch (err) {
            setLoading(false)
            toast.error(err?.message)
        }
        console.log(searchData)
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
                                Search
                            </label>
                            <form onSubmit={handleSubmit} method="#" action="#" className="mt-10">
                                <div className="mt-2 w-full">
                                    <label htmlFor="" className='text-xl font-semibold'>Select Blood Group</label>
                                    <select name='BloodGroup' required className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                        <option disabled selected>Select Blood Group</option>
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
                                        <select required name='division' onChange={getDis} className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            {
                                                divisions && divisions.map(division => <option data-id={division.id} key={division.id} value={division?.name}>{division?.name}</option>)
                                            }

                                        </select>
                                    </div>
                                    <div className="mt-2 w-full">
                                        <label htmlFor="" className='text-xl font-semibold'>District</label>
                                        <select required name='district' onChange={getUpozila} className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                            <option disabled >What is your district?</option>
                                            {
                                                districts && districts.map(district => <option data-id={district.id} key={district.id} value={district?.name}>{district?.name}</option>)
                                            }
                                        </select>
                                    </div>

                                </div>
                                <div className="mt-2 w-full">
                                    <label htmlFor="" className='text-xl font-semibold'>Upazila</label>
                                    <select  required name='upazila' className="select select-primary w-full max-w-xs mt-1 block border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0">
                                        <option disabled >What is Upazila</option>
                                        {
                                            upo && upo.map(thana => <option data-id={thana.id} key={thana.id} value={thana?.name}>{thana?.name}</option>)
                                        }
                                    </select>
                                </div>


                                <div className="mt-7">
                                    <button type='submit' className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        {loading ? <BeatLoader color="#36d7b7" /> : "Register"}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {
                
                }
            </div>
        </div>
    );
};

export default Search;