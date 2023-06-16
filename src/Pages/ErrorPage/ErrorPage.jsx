import React from 'react';
import error from '../../assets/error_page.jpg'
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='relative'>
            <img className='w-full h-screen' src={error} alt="" />
            <Link to='/'><button className='btn btn-primary absolute top-24 right-1/2 text-lg text-white'>Back to home</button></Link>
        </div>
    );
};

export default ErrorPage;