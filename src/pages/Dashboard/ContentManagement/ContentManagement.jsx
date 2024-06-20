import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../Components/Share/Title';
import useGetOne from '../../../hooks/useGetOne';
import ContentCard from './Contentcard';

const ContentManagement = () => {
    const [status , setStatus]=useState()
    const handleRole = async (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const Role = await selectedOption.getAttribute('data-id');
        setStatus(Role)
    }
    const { data ,refetch } = useGetOne(`/blogs/?status=${status}`)
    if (!data) {
      return  
    }
    return (
        <div>
            <Title header={"Content Management "}></Title>
            <div className='flex justify-center items-center gap-5'>
                <h1 className='text-4xl font-bold'>Sort:</h1>
                <select onChange={handleRole} className="select w-full max-w-xs bg-white text-slate-950">
                    <option disabled selected>Pick one</option>
                    <option data-id={null}>All</option>
                    <option data-id="draft">Draft</option>
                    <option data-id="publish">published</option>
                  
                </select>
            </div>
            <div className="flex justify-end">
                <Link to="/dashboard/content-management/AddBlog" className='btn btn-primary bg-red-600 text-white mr-10'> Add Blog</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-3 my-10">
             {
                data?.length>0?data.map(blog=><ContentCard key={blog._id} blog={blog} refetch ={refetch}></ContentCard>):
                <Title header={"No card Added"}></Title>
             }

            </div>

        </div>
    );
};

export default ContentManagement;

