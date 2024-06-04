import React from 'react';
import { PropagateLoader } from 'react-spinners';

const Spinner = () => {
    return (
        <div className='w-full mx-auto h-screen flex justify-center items-center'>
            <PropagateLoader color="#36d7b7" />
        </div>
    );
};

export default Spinner;