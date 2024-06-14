import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className="hero h-[600px] my-2 bg-center bg-cover bg-no-repeat" style={{ backgroundImage: 'url(https://i.ibb.co/YRK4DS5/19046.jpg)' }}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl" >
                            Understand User Flow.
                            <span className="sm:block"> Increase Conversion. </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            "Giving blood is not just about donating; it's about creating a lifeline that connects us all, showing that every drop counts."
                        </p>

                        <div className="mt-8 flex justify-center gap-4">
                            <Link
                                to={"/registration"}
                                className="block w-full rounded border border-rose-600 bg-rose-700 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"

                            >
                               Join as A Donor
                            </Link>

                            <Link
                            to="/search"
                                className=" justify-center items-center gap-4 w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto flex"
                               
                            >
                               <FaSearch></FaSearch> <span>Search</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;