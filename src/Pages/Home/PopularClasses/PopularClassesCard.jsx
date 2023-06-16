import React from 'react';
import { FaMoon, FaRegMoon, FaStar } from 'react-icons/fa';

const PopularClassesCard = ({ popularClass }) => {
    // console.log(popularClass)
    const { class_img, name, price, student_admit_number } = popularClass
    return (
        <div className='shadow-xl p-7 rounded-lg'>
            <img className='w-96 h-[200px]' src={class_img} alt="" />
            <p className='text-2xl font-bold mt-3'>{name}</p>
            <div className='flex justify-between items-center'>
                <p className='text-xl font-semibold my-2'>Price:${price}</p>
                <p className='flex text-orange-400'><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></p></div>
        </div>
    );
};

export default PopularClassesCard;