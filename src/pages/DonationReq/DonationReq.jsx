import React from 'react';
import useGetOne from '../../hooks/useGetOne';
import Spinner from '../../Components/Share/Spinner';
import Title from '../../Components/Share/Title';
import ReqCard from './ReqCard';

const DonationReq = () => {
    const{data ,refetch} = useGetOne("/pendingReq")
    if (!data ){
       return Spinner() 
    }
    console.log(data)
    return (
        <div>
            <Title header={"Blood Donation Requests"}></Title>

            <div id='donor'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10 mx-5 gap-10">
                {
                Array.isArray(data)?data.map(donor=><ReqCard key={donor._id} donor ={donor} ></ReqCard>): ""
                }
            </div>
        </div>
    );
};

export default DonationReq;