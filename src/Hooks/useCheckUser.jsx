import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";



const useCheckUser = () => {
    const { user, loading } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    // use axios secure with react query
    const { data, isLoading: isUserLoading } = useQuery({
        queryKey: [user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/checkUser/${user?.email}`);
            // console.log(res)
            return res.data.user;
        }
    })
    // console.log(isAdmin)
    return [data, isUserLoading]
}
export default useCheckUser;