import React from 'react';

const DonorCard = ({ donor }) => {
    console.log(donor)
    return (
        <div>
            <a className="group relative block bg-black rounded-xl">
                <img
                    alt=""
                    src={donor?.avatar}
                    className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-xl"
                />

                <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">{donor?. role}</p>

                    <p className="text-xl font-bold text-white sm:text-2xl capitalize">{donor?.name}</p>

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                        <div
                            className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
                        >
                            <p className="text-sm text-white">
                              <span className='font-bold'>Email : </span>
                              <span className='underline'> {donor?.email} </span>
                             
                            </p>
                            <p className="text-sm text-white">
                              <span className='font-bold'>Addess : </span>
                              <span className=''> {donor?.upazila} , </span>
                              <span className=''> {donor?.district} , </span>
                              <span className=''> {donor?.division} , </span>
                             
                            </p>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default DonorCard;