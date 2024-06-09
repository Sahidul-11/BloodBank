import Swal from "sweetalert2";
import useAxiosSecure from "./useAxiosSecure";

const useDelete = () => {
    const axiosSecure = useAxiosSecure()
    const handleDelete = (rout, refetch) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(rout)
                if (data) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    }
  return {handleDelete}  
};

export default useDelete;