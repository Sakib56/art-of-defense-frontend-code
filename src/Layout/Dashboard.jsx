import React from 'react';
import { Link, Outlet, ScrollRestoration } from 'react-router-dom';
import useCart from '../Hooks/useCart';
import useCheckUser from '../Hooks/useCheckUser';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';


const Dashboard = () => {
    const [cart, refetch] = useCart()
    const [data, isUserLoading] = useCheckUser()
    if (isUserLoading) {
        return;
    }
    console.log(data)
    return (
        <>
            <div className='bg-gray-200'><Navbar></Navbar></div>
            <div className='max-w-screen-2xl mx-auto'>
                <div className="drawer lg:drawer-open">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col items-center justify-center">
                        {/* Page content here */}
                        <Outlet></Outlet>
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 h-full bg-[#0D233B] text-white font-bold text-xl space-y-3">
                            {/* Sidebar content here */}
                            {
                                data == 'student' && <>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/'>BackHome</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/mySelectedClass'>My Selected Class <span className="badge badge-secondary">+{cart?.length || 0}</span></Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/myEnrolledClasses'>My Enrolled Class</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/paymentHistory'>Payment History</Link>
                                    </li>
                                </>
                            }{
                                data == 'instructor' && <>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/instructor'>Instructor Home</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/addAClass'>Add A Class</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/instructorClasses'>My Classes</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/'>Back Home</Link>
                                    </li>
                                </>
                            }
                            {
                                data == 'admin' && <>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/adminHome'>Admin Home</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/manageClasses'>Manage Classes</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/dashboard/manageUsers'>Manage Users</Link>
                                    </li>
                                    <li className='bg-slate-700 rounded-lg'>
                                        <Link to='/'>Back Home</Link>
                                    </li>
                                </>
                            }


                        </ul>

                    </div>
                </div>

            </div>
            <div className='bg-[#0D233B]'>
                <Footer></Footer>
            </div>
            <ScrollRestoration></ScrollRestoration>
        </>
    );
};

export default Dashboard;