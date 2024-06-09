import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Spinner from '../Components/Share/Spinner';
import useAuth from './useAuth';

const useUser = (rout) => {
    const {user}=useAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, isError, data, error, refetch } = useQuery({
        queryKey: [rout],
        queryFn:async()=>{
          const {data}= await axiosSecure.get(`${rout}/${user?.email}`)
          return data
        }
      })
    
      if (isPending) {
        return Spinner()
      }
    
      if (isError) {
        return toast.error(error.message)
      }
    return{data, refetch}
};

export default useUser;