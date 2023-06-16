import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const MyEnrolledClasses = () => {
    const { user } = useAuth();
    const [enrolledClasses, setEnrolledClasses] = useState([])
    useEffect(() => {
        fetch('https://art-of-defense-server-side-sakib56.vercel.app/enrolledClasses')
            .then(res => res.json())
            .then(data => {
                // setEnrolledClasses(data)
                const enrolledCollection = data.filter(dt => dt.email == user.email)
                setEnrolledClasses(enrolledCollection)
            })
    }, [])
    return (
        <div className='w-3/4 mx-auto my-10'>
            <h1 className='text-center text-3xl font-bold mb-10'>My enrolled classes</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-lg font-bold'>
                                <th>SL</th>
                                <th>Class Img</th>
                                <th>Class Name</th>
                                <th>Instructor Name</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg font-bold'>
                            {
                                enrolledClasses.map((row, index) => <tr key={row._id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img className='w-16 h-16' src={row.classImg} alt="" />
                                    </td>
                                    <td>{row.className}</td>
                                    <td>{row.instructor}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyEnrolledClasses;