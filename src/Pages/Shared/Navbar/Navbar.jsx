import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../../assets/martial-arts-logo.png'
import { AuthContext } from '../../../Provider/AuthProvider';
import { FaMoon, FaRegMoon } from 'react-icons/fa';


const Navbar = ({ toggleTheme, isDarkTheme }) => {
    const { user, logoutUser } = useContext(AuthContext)

    const [checkUser, setCheckUser] = useState()

    useEffect(() => {
        fetch('https://art-of-defense-server-side-sakib56.vercel.app/userEmail')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                const userinfo = data.find(dt => dt.email == user?.email)
                setCheckUser(userinfo?.role)
            })
    }, [user])

    console.log(checkUser)
    const navOptions = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/instructors'>Instructors</Link></li>
        <li><Link to='/classes'>Classes</Link></li>
        {
            checkUser == 'student' && <li><Link to='/dashboard/mySelectedClass '>Dashboard </Link></li>
        }
        {
            checkUser == 'instructor' && <li><Link to='/dashboard/addAClass '>Dashboard </Link></li>
        }
        {
            checkUser == 'admin' && <li><Link to='/dashboard/manageClasses'>Dashboard </Link></li>
        }


    </>
    const handleLogout = () => {
        logoutUser()
            .then(() => { })
            .catch(error => console.error())
    }
    return (
        <div >
            <div className="navbar py-3 lg:px-5">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-20">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="btn btn-ghost normal-case">
                        <img className='w-8 h-8 lg:w-10 lg:h-10' src={logoImg} alt="" />
                        <span className='text-xs lg:text-3xl lg:font-bold'> Art Of Defense</span>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 font-bold text-xl">
                        {navOptions}
                    </ul>
                </div>
                <div className="navbar-end">
                    <button onClick={toggleTheme} className="text-lg lg:mr-5 font-medium">
                        {
                            isDarkTheme ? <div className='flex justify-center items-center'><FaMoon /> <p className='hidden md:block'>Dark</p></div> : <div className='flex justify-center items-center'><FaRegMoon /> <p className='hidden md:block'>Light</p></div>
                        }
                    </button>
                    {user ? <>
                        <img className='w-8 h-8 lg:w-12 lg:h-12 rounded-full lg:mr-5' src={user.photoURL} alt="" />
                        <button onClick={handleLogout} className='btn-xs lg:btn lg:btn-neutral'>Logout</button>
                    </> :
                        <>
                            <Link to='/login'><button className='btn-xs lg:btn lg:btn-neutral'>Login</button></Link>
                        </>}
                </div>
            </div>
        </div>
    );
};

export default Navbar;