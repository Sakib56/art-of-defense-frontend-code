import { useQuery } from "@tanstack/react-query";

const useClasses = () => {

    const { data: classes = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await fetch('https://art-of-defense-server-side-sakib56.vercel.app/popularClasses');
            return res.json()
        }

    })

    return [classes, loading, refetch]
}
export default useClasses;