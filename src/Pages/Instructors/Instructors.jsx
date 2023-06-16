import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

const Instructors = () => {
    const [instructorsData, setInstructors] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('https://art-of-defense-server-side-sakib56.vercel.app/instructors')
            .then(res => {
                console.log(res.data)
                setInstructors(res.data)
                setLoading(false)
            })
            .catch(error => console.error())
    }, [])
    return (
        <div className='my-8 lg:my-20 max-w-6xl mx-auto'>
            <h1 className='text-center font-bold text-4xl'>All instructors</h1>
            {
                loading ? <>
                    <div className='text-center mt-10'><ClipLoader
                        color="#36d7b7"
                        // loading={loading}
                        // cssOverride={override}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    /> </div>
                </> : <div className='mt-10'>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            {/* head */}
                            <thead>
                                <tr className='text-lg'>
                                    <th>SL</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    instructorsData.map((instructor, index) => <tr key={instructor._id}>
                                        <td className='text-xl font-bold'>{index + 1}</td>
                                        <td>
                                            <img className='w-32 h-20 rounded-full' src={instructor.photo} alt="" />
                                        </td>
                                        <td className='text-xl font-semibold'>{instructor.name}</td>
                                        <td className='text-xl font-semibold'>{instructor.email}</td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default Instructors;