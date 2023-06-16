import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const InstructorAllClasses = () => {
    const { user } = useAuth()
    console.log(user)
    const [instructorClass, setInstructorsClass] = useState([])
    useEffect(() => {
        axios.get('https://art-of-defense-server-side-sakib56.vercel.app/allClasses')
            .then(res => {
                const result = res.data.filter(dt => dt.instructor_email == user?.email)
                setInstructorsClass(result)

            })
            .catch(error => console.error())
    }, [user])
    return (
        <div className='w-full my-10'>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-xl'>
                            <th>Sl</th>
                            <th>class</th>
                            <th>Status</th>
                            <th>Total Enrolled Students</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody className='text-lg'>
                        {/* row 1 */}
                        {
                            instructorClass.map((insClass, index) => <tr key={insClass._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
                                                <img src={insClass.class_img}/>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{insClass.name}</div>
                                            <div className="text-md opacity-70">Price: ${insClass.price}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <button className='btn'>{insClass.status}</button>
                                </td>
                                <td>
                                    {insClass.student_admit_number}
                                </td>
                                <td>
                                    {insClass.Feedback}
                                </td>
                            </tr>)
                        }                       


                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default InstructorAllClasses;