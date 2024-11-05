import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Recent3 from './Recent3';
import Panel from './Panel';
import useRole from '../../../hooks/useRole';

const Welcome = () => {
    const {user} = useAuth()
    const [role, isLoading] =useRole()
    if (isLoading) {
      return
    }
    return (
        <div>
          <div className='text-center w-full'>
          <h1 className=" text-center py-14 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl" >
               Welcome Back ,<span className='bg-opacity-90'> {user?.displayName}..</span>
                <span className="block lg:text-4xl"> Increase Helping Hand. </span>
            </h1>
          </div>
          {role==="admin" || role==="volunteer"?  <div className="my-8">
            <Panel/>
          </div>: " "}
          <Recent3 />
        </div>
    );
};

export default Welcome;