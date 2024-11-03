import React from 'react';
import useGetOne from '../../hooks/useGetOne';
import { Card } from 'flowbite-react';
import { useNavigate, useParams } from 'react-router-dom';

const BlogDetails = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const { data } = useGetOne(`/blogs/${id}`)
    return (
        <div>
            <Card
                className="w-10/12 md:w-2/5 mx-auto my-6 shadow-2xl"
                imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
                imgSrc={data?.avatar}
            >
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"> <span className='underline'>Title :</span> <br />
                    {data?.title}
                </h5>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900 dark:text-white"> <span className='underline text-xl'>Content :</span> <br />
                        {data?.content}</span>

                </div>
                <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center w-1/2 px-5 py-1 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto   hover:bg-gray-100 '
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180 text-rose-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>Go back</span>
            </button>

            </Card>

        </div>
    );
};

export default BlogDetails;