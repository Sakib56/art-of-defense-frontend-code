import React from 'react';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
const img_hosting_token = import.meta.env.VITE_image_hosting_token
const AddClasses = () => {
    const { user } = useAuth();
    // console.log(user)
    const [axiosSecure] = useAxiosSecure()
    const { register, handleSubmit, reset } = useForm();
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`


    const onSubmit = data => {
        // console.log(data)
        // 
        const formData = new FormData()
        formData.append('image', data.class_img[0])

        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL)
                    const newClass = data;
                    newClass.class_img = imgURL;
                    newClass.price = parseFloat(data.price)
                    newClass.available_seats = parseFloat(data.available_seats)
                    newClass.status = 'pending'
                    newClass.Feedback = ""
                    newClass.student_admit_number = 0;
                    console.log(newClass)

                    axiosSecure.post('/newClass', newClass)
                        .then(data => {
                            console.log('After posting new class', data.data)
                            if (data.data.insertedId) {
                                reset()
                                Swal.fire({
                                    position: 'center',
                                    icon: 'success',
                                    title: 'new class successfully added',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })

                }
            })
    };
    // console.log(img_hosting_token)
    return (
        <div className='w-full my-10'>
            <h1 className='text-4xl text-center font-bold my-5'>Add Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-3/4 mx-auto bg-gray-100 p-10'>

                <div className='grid grid-cols-2 gap-5 my-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Class Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} placeholder="Class name" className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input type="file" {...register("class_img", { required: true })} className="file-input file-input-bordered w-72" />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5 my-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Instructor Name</span>
                        </label>
                        <input readOnly type="text" {...register("instructor", { required: true })} placeholder="name" defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Instructor Email</span>
                        </label>
                        <input readOnly type="text" {...register("instructor_email", { required: true })} placeholder="email" defaultValue={user?.email} className="input input-bordered" />
                    </div>
                </div>
                <div className='grid grid-cols-2 gap-5 my-5'>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Available seat</span>
                        </label>
                        <input type="number" {...register("available_seats", { required: true })} placeholder="available seat" defaultValue={user?.displayName} className="input input-bordered" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Price </span>
                        </label>
                        <input type="text" {...register("price", { required: true })} placeholder="price" className="input input-bordered" />
                    </div>
                </div>

                <div className='text-center'>
                    <input className='btn  btn-outline text-white mt-3 bg-slate-700' type="submit" value="Add Items" />
                </div>
            </form>


        </div>
    );
};

export default AddClasses; 