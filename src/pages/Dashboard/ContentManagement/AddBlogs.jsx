import React, { useRef, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import useAuth from '../../../hooks/useAuth';
import JoditEditor from 'jodit-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddBlogs = () => {
    const navigate =useNavigate()
    const editor = useRef(null);
	const [content, setContent] = useState('');
    const axiosSecure = useAxiosSecure()

    const { user, loading, setLoading } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const email = user?.email
        const image = form.image.files[0];
        const status = false;
        const formData = new FormData()
        formData.append('image', image)

        try {

            setLoading(true)
            const { data } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KAY}`,
                formData
            )
            const avatar = data?.data?.display_url
            const blog = {title, avatar, email, content, status }
            await axiosSecure.post("/Blogs", blog)
                .then(res => console.log(res.data))
            toast.success("Successfully Added")
            navigate("/dashboard/content-management")
            setLoading(false)

        }
        catch (err) {
            setLoading(false)
            toast.error(err?.message)
        }

    }
    return (
        <div>
            <div className="font-sans text-slate-800">
                <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                    <div className="relative w-9/12  md:w-3/5">
                        <div className="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                        <div className="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                        <div className="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                            <label for="" className="block mt-3 text-3xl text-gray-700 text-center font-semibold">
                                Write Blog
                            </label>
                            <form onSubmit={handleSubmit} method="#" action="#" className="mt-10">
                                <div>
                                    <input type="text" placeholder="Title" name='title' className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>

                                <div className="mt-2">
                                    <label htmlFor="" className='text-xl font-semibold'>Your Profile picture</label>
                                    <input type="file" name='image' placeholder="Photo URL" className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                                </div>
                                <div className="mt-2">
                                    <label htmlFor="" className='text-xl font-semibold'>Content</label>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        tabIndex={2}
                                        onBlur={newContent => setContent(newContent) } 
                                    />

                                </div>

                                <div className="mt-7">
                                    <button type='submit' className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        {loading ? <BeatLoader color="#36d7b7" /> : "Add Blog"}
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

export default AddBlogs;