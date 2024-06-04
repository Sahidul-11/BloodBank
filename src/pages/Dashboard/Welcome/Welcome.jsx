import React from 'react';
import useAuth from '../../../hooks/useAuth';

const Welcome = () => {
    const {user} = useAuth()
    return (
        <div>
          <div className='text-center w-full'>
          <h1 className=" text-center py-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl" >
               Welcome Back ,<span className='bg-opacity-90'> {user?.displayName}..</span>
                <span className="block lg:text-4xl"> Increase Helping Hand. </span>
            </h1>
          </div>
        </div>
    );
};

export default Welcome;