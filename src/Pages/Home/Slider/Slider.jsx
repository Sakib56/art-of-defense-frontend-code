import React from 'react';
import img1 from '../../../assets/slider-1.jpg';
import img2 from '../../../assets/slider-2.jpg';
import img3 from '../../../assets/slider-3.jpg';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Slider.css'
const Slider = () => {
    return (

        <div className='text-center w-full'>
            <Carousel>
                <div>
                    <img className='max-h-[600px]' src={img2} />
                    <div className="legend lg:mb-28">
                        <div className='bg-transparent opacity-100'>
                            <h1 className='uppercase mx-auto p-1 lg:p-3 bg-black w-fit lg:text-4xl rounded-full text-white font-bold'>Art of defense academy</h1>
                            <h1 className='uppercase mx-auto mt-2 lg:mt-5 p-1 lg:p-3 bg-pink-700 rounded-full w-fit lg:text-5xl text-white font-bold'>Train With Our Best legends</h1>
                            <p className='text-x lg:text-2xl mt-2 lg:mt-3'>EVERY GREAT JOURNEY STARTS WITH ONE STEP</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img className='max-h-[600px]' src={img1} />
                    <div className="legend lg:mb-28 flex justify-end">
                        <div className='bg-transparent opacity-100'>
                            <h1 className='uppercase mx-auto p-1 md:p-3 bg-black w-fit lg:text-4xl rounded-full text-white font-bold'>Art of defense academy</h1>
                            <h1 className='uppercase mx-auto mt-2 lg:mt-5 p-1 lg:p-3 bg-pink-700 rounded-full w-fit lg:text-5xl text-white font-bold'>Train With Our Best legends</h1>
                            <p className='text-x lg:text-2xl mt-2 lg:mt-3'>EVERY GREAT JOURNEY STARTS WITH ONE STEP</p>
                        </div>
                    </div>
                </div>
                <div>
                    <img className='max-h-[600px]' src={img3} />
                    <div className="legend lg:mb-28 flex justify-start">
                        <div className='bg-transparent opacity-100'>
                            <h1 className='uppercase mx-auto p-1 lg:p-3 bg-black w-fit lg:text-4xl rounded-full text-white font-bold'>Art of defense academy</h1>
                            <h1 className='uppercase mx-auto mt-2 lg:mt-5 p-1 lg:p-3 bg-pink-700 rounded-full w-fit lg:text-5xl text-white font-bold'>Train With Our Best legends</h1>
                            <p className='text-x lg:text-2xl mt-2 lg:mt-3'>EVERY GREAT JOURNEY STARTS WITH ONE STEP</p>
                        </div>
                    </div>
                </div>

            </Carousel>
        </div>

    );
};

export default Slider;