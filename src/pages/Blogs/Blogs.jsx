import React from 'react';
import useGetOne from '../../hooks/useGetOne';
import { Card } from 'flowbite-react';
import Title from '../../Components/Share/Title';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const { data } = useGetOne("/blogs/?status=publish")
    console.log(data)
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mx-3 my-10">
                {
                    data?.length > 0 ? data.map(blog => <Card key={blog?._id}
                        className="max-w-sm mx-auto"
                        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                        imgSrc={blog?.avatar}
                    >
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> <span className='underline'>Title :</span> <br />
                            {blog?.title}
                        </h5>

                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-gray-900 dark:text-white"> <span className='underline text-xl'>Content :</span> <br />
                                {blog?.content}</span>

                        </div>
                        <Link to={`/blogs/${blog?._id}`}>  
                            <button
                                className="inline-flex items-center btn rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                            >
                                View Details
                            </button>
                        </Link>
                    </Card>) :
                        <Title header={"No Blog Published"}></Title>
                }

            </div>

        </div>
    );
};

export default Blogs;