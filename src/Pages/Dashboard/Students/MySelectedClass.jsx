import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import useCart from '../../../Hooks/useCart';

const MySelectedClasses = () => {
    const [cart, refetch] = useCart()
    console.log(cart)
    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://art-of-defense-server-side-sakib56.vercel.app/carts/${id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch()
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }

        })
    }
    return (
        <div className='w-full my-10'>
            <div className='flex justify-around text-2xl font-bold my-5'>
                <h1>My selected Classes :{cart.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className='text-xl'>
                        <tr>
                            <th>#</th>
                            <th>Class Image</th>
                            <th>Class Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((row, index) => <tr
                                key={row._id}
                            >
                                <td className='text-xl'> {index + 1}</td>
                                <td>
                                    <div className="items-center ">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-16 h-16">
                                                <img src={row.class_img} />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td className='text-xl'>
                                    {row.name}
                                </td>
                                <td className='text-xl'>$ {row.price}</td>
                                <td>
                                    <Link to={`/dashboard/payment/${row._id}`}><button className='btn btn-success'>Pay</button></Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(row._id)} className="btn btn-ghost text-red-500 bg-red-200 text-2xl"><FaTrashAlt /></button>
                                </td>
                            </tr>)
                        }


                    </tbody>


                </table>
            </div>

        </div>

    );
};

export default MySelectedClasses;