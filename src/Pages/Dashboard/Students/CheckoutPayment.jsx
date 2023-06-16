import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const CheckOutForm = ({ cart, price }) => {
    // console.log(cart[0])
    const { user } = useAuth()
    const stripe = useStripe();
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')

    useEffect(() => {
        if (price > 0) {
            axiosSecure.post('/create-payment-intent', { price })
                .then(res => {
                    // console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret);
                })
        }
    }, [price])


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        // console.log('card', card)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if (error) {
            // console.log('error', error)
            setCardError(error.message)
        }
        else {
            // console.log('payment method', paymentMethod)
            setCardError('')
        }
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || 'unknown',
                        name: user?.displayName || 'anonymous'
                    },
                },
            },
        );

        if (confirmError) {
            // console.log(confirmError);
        }
        // console.log('payment intent', paymentIntent)

        setProcessing(false)
        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id)
            const transactionId = paymentIntent.id;
            // save payment information to the sever
            const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price: cart[0].price,
                date: new Date(),
                status: 'service pending',
                classId: cart[0]._id,
                className: cart[0].name,
                classImg: cart[0].class_img,
                instructor: cart[0].instructor
            }
            axiosSecure.post('/payments', payment)
                .then(res => {
                    console.log(res.data)

                    fetch(`https://art-of-defense-server-side-sakib56.vercel.app/carts/${cart[0]._id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            const available_seats = cart[0].available_seats - 1;
                            const student_admit_number = cart[0].student_admit_number
                            const updateInfo = {
                                id: cart[0]._id, seatNum: available_seats,
                                student_admit_number: student_admit_number
                            }
                            fetch(`https://art-of-defense-server-side-sakib56.vercel.app/updateSeatNumbers`, {
                                method: "PATCH",
                                headers: {
                                    'content-type': 'application/json'
                                },
                                body: JSON.stringify(updateInfo)
                            })
                        })



                    if (res.data.insertedId) {
                        Swal.fire({
                            title: 'payment successfully !',
                            text: '',
                            icon: 'success',
                            confirmButtonText: 'ok'
                        })
                    }
                })
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-info w-32 mt-8' type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>
            {
                cardError && <p className='text-center mt-5 text-red-500'>{cardError}</p>
            }
            {
                transactionId && <p className='text-center text-green-500 mt-5'>Transaction complete with transactionId:{transactionId}</p>
            }
        </div>
    );
};

export default CheckOutForm;