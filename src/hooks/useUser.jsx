import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Spinner from '../Components/Share/Spinner';
import useAuth from './useAuth';

const useUser = () => {
    const {user}=useAuth()
    const axiosSecure = useAxiosSecure()
    const { isPending, isError, data, error } = useQuery({
        queryKey: ['user'],
        queryFn:async()=>{
          const {data}= await axiosSecure.get(`/user/${user?.email}`)
          return data
        }
      })
    
      if (isPending) {
        return Spinner()
      }
    
      if (isError) {
        return toast.error(error.message)
      }
    return{data}
};

export default useUser;