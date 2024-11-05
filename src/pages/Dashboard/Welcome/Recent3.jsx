import React from 'react';
import useGetOne from '../../../hooks/useGetOne';
import DonationReqTable from '../MyBloodDonationReq/DonationReqTable';
import Title from '../../../Components/Share/Title';
import { Link } from 'react-router-dom';
import Spinner from '../../../Components/Share/Spinner';
import useAuth from '../../../hooks/useAuth';

const Recent3 = () => {
    const {user}=useAuth()
    const { data, refetch } = useGetOne(`/recent/${user?.email}`)
    if (!data) {
        return Spinner()
    }
    return (
        <div className={`max-w-screen-xl mx-auto px-4 md:px-8 ${data.length>0?"visible": "hidden"}`}>
            <div className="text-center">
                <Title  header={"Recent Blood Donation Requests"}></Title>
            </div>
            <div className="items-start justify-between md:flex">
                <div className="max-w-lg">
                    <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
                        recipient name
                    </h3>

                </div>

            </div>
            <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto ">
                <table className="w-full table-auto text-sm text-left overflow-x-scroll">
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

                            data.map(req => <DonationReqTable key={req._id} req={req} refetch={refetch}></DonationReqTable>)
                        }
                    </tbody>
                </table>
            </div>
          <Link to={"/dashboard/my-donation-requests"} ><button className='btn btn-active block mx-auto my-8 bg-lime-600 text-white'>View All Requests</button></Link>
        </div>
    );
};

export default Recent3;