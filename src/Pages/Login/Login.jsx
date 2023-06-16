import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import img from '../../assets/login.jpg'
import googleImg from '../../assets/google.png';
import { useForm } from 'react-hook-form';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser, googleLogin } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        loginUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                navigate(from, { replace: true });
                Swal.fire({
                    title: 'Login successfully !',
                    text: '',
                    icon: 'success',
                    confirmButtonText: 'ok'
                })
            })
            .catch(error => console.log(error))
    }

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser)
                const savedUser = { name: loggedUser.displayName, photo:loggedUser.photoURL, loggedUser, email: loggedUser.email, role: 'student' }
                fetch('https://art-of-defense-server-side-sakib56.vercel.app/users', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='max-w-6xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 my-10'>
                <div className='flex items-center'>
                    <img className='w-3/4 lg:w-full md:h-[400px] mx-auto' src={img} alt="" />
                </div>
                <div className='border rounded-xl mx-auto w-full md:w-3/4 p-5'>
                    <h1 className='text-3xl mt-2 font-bold text-center text-primary'>Sign In</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='p-5'>
                        <div className='form-control'>
                            <label>
                                <p className='text-lg font-semibold mb-1 mt-3'>Email</p>
                            </label>
                            <input className="input input-bordered w-full" type="email" {...register("email", { required: true })} placeholder='Enter your email' name="email" />
                            {errors.email && <p className='text-sm text-red-600 mt-2'>email is required</p>}
                        </div>
                        <div className='form-control relative'>
                            <label>
                                <p className='text-lg font-semibold mb-1 mt-3'>Password</p>
                            </label>
                            <input {...register("password", { required: true })} className="input input-bordered w-full" type={showPassword ? 'password' : 'text'} placeholder='Enter your password' name="password" />
                            {errors.password && <p className='text-sm text-red-600 mt-2'>Password is required</p>}
                            <div onClick={() => setShowPassword(!showPassword)} className='absolute top-14 right-5 cursor-pointer'>
                                {
                                    showPassword ? <FaRegEye className='text-xl'></FaRegEye> : <FaEyeSlash className='text-xl'></FaEyeSlash>
                                }
                            </div>

                        </div>

                        <p className='text-red-400 mt-3'>{error}</p>
                        <input type="submit" className='w-full bg-primary rounded-lg mt-5 py-2 text-xl text-white font-bold cursor-pointer' value="Sign In" />
                        <h1 className='text-center text-md mt-5'>New User Please ? <Link to='/signUp'><span className='link text-primary'>Sign Up</span></Link></h1>
                    </form>
                    <div onClick={handleGoogleLogin} className='px-8 cursor-pointer'>
                        <button className='flex items-center justify-center gap-4 btn btn-outline border text-primary border-pink-600 w-full hover:bg-primary hover:border-0'>sign In With Google <img className='w-12 h-12 p-2' src={googleImg} alt="" /></button>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Login;