import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CheckOutForm from './CheckoutPayment';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Stripe_key);

const Payment = () => {
    const [classInfo, setClassInfo] = useState([])
    const { id } = useParams()
    // console.log(id)
    useEffect(() => {
        fetch(`https://art-of-defense-server-side-sakib56.vercel.app/cart/${id}`)
            .then(res => res.json())
            .then(data => {
                setClassInfo(data)
            })
    }, [])

    console.log(classInfo)
    return (
        <div className='w-full'>
            <h1 className='text-center text-3xl font-bold mb-5'>Payment Classes Enrol Fee</h1>
            <div className='text-lg text-center font-semibold'>
                <h1>Class: {classInfo[0]?.name}</h1>
                <p className='mb-20'>Price: ${classInfo[0]?.price}</p>
            </div>
            <div className='w-1/2 mx-auto'>
                <Elements stripe={stripePromise}>
                    <CheckOutForm cart={classInfo} price={classInfo[0]?.price} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;