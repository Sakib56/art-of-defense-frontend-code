import React from 'react';
import Slider from '../Slider/Slider';
import PopularClasses from '../PopularClasses/PopularClasses';
import PopularInstructors from '../PopularInstructors/PopularInstructors';
import Blog from '../Blogs/Blogs';

const Home = () => {
    return (
        <div>
           <Slider></Slider>
           <PopularClasses></PopularClasses>
           <PopularInstructors></PopularInstructors>
           <Blog></Blog>
        </div>
    );
};

export default Home;