import { useQuery } from "@tanstack/react-query"
import useAuth from "./useAuth"
import useAxiosSecure from "./useAxiosSecure"


const useCart = () => {
    const { user, loading } = useAuth()
    const token = localStorage.getItem('access-token')
    const [axiosSecure] = useAxiosSecure()
    const { isLoading, refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            // console.log('res from data', res)
            return res.data
        }
    })
    return [cart, refetch, isLoading]
}
export default useCart;