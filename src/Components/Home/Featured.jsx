import useGetOne from "../../hooks/useGetOne";
import Spinner from "../Share/Spinner";
import Title from "../Share/Title";

const Featured = () => {
    const { data } = useGetOne("/topUser")
    if (!data) {
        return Spinner()
    }
    console.log(data)
    return (
        <div>
            <div>
                <Title header={"Feature of Top Donors"} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 gap-10">
                {
                    data.map(user => < div key={user._id} class="w-full  px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
                        <div class="flex justify-center -mt-16 md:justify-end">
                            <img class="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400" alt="Testimonial avatar" src={user?.avatar} />
                        </div>

                        <h2 class="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Blood Group : <span className="text-red-600 font-bold">{user?.BloodGroup}</span></h2>

                        <p class="mt-2 text-sm text-gray-600 dark:text-gray-200">Blood donation is a lifesaving act that supports medical treatments and emergency interventions, directly impacting the health and survival of recipients. It's a simple, quick process with minimal discomfort, offering a profound sense of contribution and community support. Regular donations </p>

                        <div class="flex justify-end mt-4">
                            <a href="#" class="text-lg font-medium text-blue-600 dark:text-blue-300" tabindex="0" role="link">{user?.name}</a>
                        </div>
                    </div>)
                }
            </div>

        </div>
    );
};

export default Featured;