import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    // const [userInfo, setUserInfo] = useState([])
    // const [loading, setLoading] = useState(true)
    // useEffect(() => {
    //     axios.get('https://art-of-defense-server-side-sakib56.vercel.app/userEmail')
    //         .then(res => {
    //             // console.log(res.data)
    //             setUserInfo(res.data)
    //         })
    //         .catch(error => console.error())
    // }, [])

    const { isLoading, refetch, data: userInfo = [] } = useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await axios.get('https://art-of-defense-server-side-sakib56.vercel.app/userEmail')
            // console.log('res from data', res)
            return res.data
        }
    })

    const handleInstructor = (id, role) => {
        console.log(id, role)
        const updateData = { id: id, role: role }
        fetch('https://art-of-defense-server-side-sakib56.vercel.app/updateUser', {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)

        })
            .then(res => res.json())
            .then(data => {
                refetch()
                if (data.modifiedCount) {
                    Swal.fire({
                        title: 'User role updated successfully !',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                }
            })
    }
    const handleAdmin = (id, role) => {
        console.log(id, role)
        const updateData = { id: id, role: role }
        fetch('https://art-of-defense-server-side-sakib56.vercel.app/updateUser', {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateData)

        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data)
                if (data.modifiedCount) {
                    Swal.fire({
                        title: 'User role updated successfully !',
                        text: '',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                }
            })
    }
   
    return (
        <div className='w-5/6 mx-auto mb-20'>
            <h1 className='text-center text-3xl font-bold my-5'>Manage users</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-xl'>
                                <th>Sl</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Make Instructor</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg'>

                            {
                                userInfo.map((user, index) => <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td ><button onClick={() => handleInstructor(user._id, 'instructor')} className={`btn btn-sm ${user?.role == 'instructor' ?'btn-disabled' : 'btn-primary'}`}>Make Instructor</button></td>
                                    <td><button onClick={() => handleAdmin(user._id, 'admin')} className={`btn btn-sm ${user?.role == 'admin' ? 'btn-disabled' : 'btn-primary'}`}>Make Admin</button></td>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;