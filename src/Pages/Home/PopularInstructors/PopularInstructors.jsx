import React, { useEffect, useState } from 'react';
import useClasses from '../../../Hooks/useClasses';
import PopularInstructorsCard from './PopularInstructorsCard';
import axios from 'axios';

const PopularInstructors = () => {
    // const [classes] = useClasses()
    // console.log(classes);
    const [popularInstructor, setPopularInstructor] = useState([])
    useEffect(() => {
        axios.get('https://art-of-defense-server-side-sakib56.vercel.app/popularClasses')
            .then(res => {
                const result = res.data.filter(dt => dt.status == 'approved')
                setPopularInstructor(result)
            })
            .catch(error => console.error())
    }, [])
    return (
        <div className='my-8 lg:my-20 max-w-6xl mx-auto'>
            <h1 className='text-4xl text-center font-bold'>Popular Instructors</h1>
            <p className='text-center italic mt-2 lg:mb-7'>Join our martial art club and be healthy.</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    popularInstructor.slice(0, 6).map(PopularInstructors => <PopularInstructorsCard
                        key={PopularInstructors._id}
                        PopularInstructors={PopularInstructors}
                    ></PopularInstructorsCard>)
                }
            </div>
        </div>
    );
};

export default PopularInstructors;