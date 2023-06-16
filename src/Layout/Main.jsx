import React, { useState } from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    };
    return (
        <div className={isDarkTheme ? 'bg-[#111827] bg-gray-[dark] text-[white]' : ''}>
            <div className={isDarkTheme ? 'bg-[#111827] bg-gray-[dark] text-white' : 'bg-gray-200'}>
                <Navbar isDarkTheme={isDarkTheme} toggleTheme={toggleTheme}></Navbar>
            </div>
            <Outlet></Outlet>
            <div className={isDarkTheme ? 'bg-[#111827] text-white' : ' bg-[#0D233B]'}>
                <Footer></Footer>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </div>
    );
};

export default Main;