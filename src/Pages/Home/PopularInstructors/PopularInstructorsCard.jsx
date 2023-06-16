import React from 'react';
import { FaMoon, FaRegMoon, FaStar } from 'react-icons/fa';

const PopularInstructorsCard = ({ PopularInstructors }) => {
    // console.log(PopularInstructors)
    const { instructor, instructor_img, student_admit_number } = PopularInstructors
    return (

        <div className='shadow-xl p-7 rounded-lg'>
            <img className='w-96 h-[200px]' src={instructor_img} alt="" />
            <p className='text-2xl font-bold mt-3'>{instructor}</p>
            <div className='flex justify-between items-center'>
                <p className='text-xl font-semibold my-2'>Students :  {student_admit_number}</p>
                <p className='flex text-orange-400'><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p></div>
        </div>
    );
};

export default PopularInstructorsCard;