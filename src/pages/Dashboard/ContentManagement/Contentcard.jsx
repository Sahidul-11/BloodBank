import { Card } from 'flowbite-react';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useDelete from '../../../hooks/useDelete';
import useRole from '../../../hooks/useRole';
import Spinner from '../../../Components/Share/Spinner';

const ContentCard = ({ blog, refetch }) => {
    const {handleDelete} = useDelete()
    const axiosSecure =useAxiosSecure()
    const [role, isLoading] =useRole()
    if (isLoading) {
        return Spinner()
    }
    const { title, avatar, email, content, status } = blog
    const handlePublish =async ()=>{
       try{
        await axiosSecure.patch(`/blogs/${blog._id}`, {status})
        toast.success("Change successfully")
        refetch()
       }
       catch(err){
        toast.error(err.message)
       }    
    }
    const deleteBlog = async()=>{
      handleDelete(`/blogs/${blog._id}`, refetch)
    }
    return (
        <Card
            className="max-w-sm"
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc={avatar}
        >
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> <span className='underline'>Title :</span> <br />
                {title}
            </h5>

            <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white"> <span className='underline text-xl'>Content :</span> <br />
                    {content}</span>

            </div>
            <div><span className='text-xl font-bold underline'>Status :</span><span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                {status ? "Published" : "Draft"}
            </span></div>
            <div className={`mt-4 flex space-x-3 lg:mt-6 ${role==="admin"?"visible" : "hidden"}`}>
                <button
                onClick={handlePublish}
                 
                    className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                >
                   {!status? " Publish" : "UnPublish"}
                </button>
                <button
                   onClick={deleteBlog}
                    className="inline-flex items-center text-red-700 rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium  hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                    Delete
                </button>
            </div>
        </Card>
    );
};

export default ContentCard;
