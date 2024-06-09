import React from 'react';
import useUser from '../../../hooks/useUser';
import DonationReqTable from './DonationReqTable';

const MyBloodDonationReq = () => {
    const { data ,refetch } = useUser("/donationReq")
     if (!data) {
       return  
     }
   
    return (
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        recipient name
                    </h3>

                </div>
                <div className="mt-3 md:mt-0">
                    <a
                        href="javascript:void(0)"
                        className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
                    >
                        Add member
                    </a>
                </div>
            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
                <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-50 text-gray-600 font-medium border-b">
                        <tr>
                            <th className="py-3 px-6"> Recipient name</th>
                            <th className="py-3 px-6"> Recipient location</th>
                            <th className="py-3 px-6"> Donation date & time</th>
                            <th className="py-3 px-6">Donation status</th>
                            <th className="py-3 px-6">Action</th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-600 divide-y">
                        {
                    
                        data.map(req=> <DonationReqTable key={req._id} req={req} refetch={refetch}></DonationReqTable>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyBloodDonationReq;