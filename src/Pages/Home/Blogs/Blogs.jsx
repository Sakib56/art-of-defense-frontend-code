import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Blog = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            delay: 100,
            easing: 'ease-in-out',
        });
    }, []);
    return (
        <div className='my-8 lg:my-20 max-w-7xl mx-auto overflow-hidden'>
            <div className='text-center mb-7'>
                <h1 className='text-4xl font-bold'>News & blog</h1>
                <p className='text-lg mt-2'>Join our martial art club and be healthy.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
                <div data-aos-offset="200" data-aos="zoom-in" data-aos-once="false" className='shadow-xl p-5'>
                    <img className='w-full h-52' src="https://i.ibb.co/LPSggMm/blog1.jpg" alt="" />
                    <p className='mt-2 text-justify'>Martial arts is not just about physical combat skills; it is a way of life that instills discipline, focus, and self-control. In this blog post, we delve into the transformative power of martial arts and how it helps ....</p>
                    <button className='bg-red-700 px-5 py-1 mt-2 text-white'>Read More ...</button>
                </div>
                <div data-aos-offset="200" data-aos="zoom-in" data-aos-once="false" className='shadow-xl p-5'>
                    <img className='w-full h-52' src="https://i.ibb.co/12vwR2m/blog2.jpg" alt="" />
                    <p className='mt-2 text-justify'> Martial arts have a rich history that spans thousands of years. From ancient combat techniques to modern self-defense systems, the evolution of martial arts is a fascinating journey....</p>
                    <button className='bg-red-700 px-5 py-1 mt-2 text-white'>Read More ...</button>
                </div>
                <div data-aos-offset="200" data-aos="zoom-in" data-aos-once="false" className='shadow-xl p-5'>
                    <img className='w-full h-52' src="https://i.ibb.co/YDmKbFF/blog3.jpg" alt="" />
                    <p className='mt-2 text-justify'>The Benefits of Martial Arts Training for Children and Teens"Excerpt: Martial arts training offers numerous benefits for children and teenagers, extending far beyond physical fitness. In this blog post,  ....</p>
                    <button className='bg-red-700 px-5 py-1 mt-2 text-white'>Read More ...</button>
                </div>
                <div data-aos-offset="200" data-aos="zoom-in" data-aos-once="false" className='shadow-xl p-5'>
                    <img className='w-full h-52' src="https://i.ibb.co/74J6LVr/blog4.jpg" alt="" />
                    <p className='mt-2 text-justify'>Mixed Martial Arts (MMA) has become one of the fastest-growing sports in the world, captivating audiences with its intense action and skilled athletes. In this blog post, we take you inside the octagon and...</p>
                    <button className='bg-red-700 px-5 py-1 mt-2 text-white'>Read More ...</button>
                </div>
            </div>
        </div>
    );
};

export default Blog;