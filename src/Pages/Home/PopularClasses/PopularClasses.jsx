import React, { useEffect, useState } from 'react';
import useClasses from '../../../Hooks/useClasses';
import PopularClassesCard from './PopularClassesCard';
import axios from 'axios';

const PopularClasses = () => {
    const [popularClasses, setPopularClasses] = useState([])
    // const [classes] = useClasses()
    // console.log(classes)
    useEffect(() => {
        axios.get('https://art-of-defense-server-side-sakib56.vercel.app/popularClasses')
            .then(res => {
                const result = res.data.filter(dt => dt.status == 'approved')
                setPopularClasses(result)
            })
            .catch(error => console.error())
    }, [])
    return (
        <div className='my-8 lg:my-20 max-w-6xl mx-auto'>
            <h1 className='text-4xl text-center font-bold'>Popular Classes</h1>
            <p className='text-center italic mt-2 lg:mb-7'>Join our martial art club and be healthy.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    popularClasses.slice(0, 6).map(popularClass => <PopularClassesCard
                        key={popularClass._id}
                        popularClass={popularClass}
                    ></PopularClassesCard>)
                }
            </div>
        </div>
    );
};

export default PopularClasses;