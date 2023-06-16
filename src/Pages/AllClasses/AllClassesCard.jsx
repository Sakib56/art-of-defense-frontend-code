import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Fade, Slide } from "react-awesome-reveal";


const AllClassesCard = ({ classes, role }) => {
    const { user } = useContext(AuthContext)
    // console.log(role)

    const [show, setShow] = useState(false)
    const navigate = useNavigate()
    const { class_img, instructor, name, available_seats, price, _id, student_admit_number } = classes
    const handleClassSelect = (data) => {
        if (!user) {
            Swal.fire({
                title: 'If you select this class please login!',
                text: '',
                icon: 'warning',
                confirmButtonText: 'ok'
            })
            return navigate('/login')
        }
        else {
            const selectClasses = { class_img: data.class_img, instructor: data.instructor, name: data.name, available_seats: data.available_seats, price: data.price, email: user?.email, student_admit_number: student_admit_number }

            fetch('https://art-of-defense-server-side-sakib56.vercel.app/studentSelectClasses', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectClasses)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(selectClasses)
                    console.log(data)
                    setShow(true)
                    if (data.insertedId) {
                        Swal.fire({
                            title: 'class selected successfully !',
                            text: '',
                            icon: 'success',
                            confirmButtonText: 'ok'
                        })
                    }
                })

        }
    }
    return (

        <>
            <Fade>
                <div className={`shadow-2xl p-10 rounded ${available_seats <= 0 ? 'bg-red-400' : ''}`}>
                    <img className='w-full h-60 rounded-lg' src={class_img} alt="" />
                    <p className='text-xl font-bold'>{name}</p>
                    <p className='text-xl font-semibold mt-3'>Instructor name : {instructor}</p>

                    <div className='flex justify-between items-end mt-5'>
                        <div className='text-lg font-semibold'>
                            <p>Price: ${price}</p>
                            <p>Available seats:{available_seats}</p>
                        </div>
                        <button disabled={role == 'admin' || role == 'instructor'} onClick={() => handleClassSelect(classes)} className={`${available_seats <= 0 || show ? 'btn-disabled' : 'btn btn-primary'} font-bold px-3 rounded py-2`}>Select class</button>

                    </div>
                </div>
            </Fade>
        </>

    );
};

export default AllClassesCard;