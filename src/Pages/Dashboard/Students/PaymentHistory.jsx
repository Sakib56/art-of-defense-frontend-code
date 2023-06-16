import React, { useEffect, useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const PaymentHistory = () => {
    const { user } = useAuth()
    const [paymentHistory, setPaymentHistory] = useState([])
    useEffect(() => {
        fetch('https://art-of-defense-server-side-sakib56.vercel.app/paymentHistory')
            .then(res => res.json())
            .then(data => {
                const paymentCollection = data.filter(dt => dt.email == user.email);
                setPaymentHistory(paymentCollection)
            })
    }, [])
    // 
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        const formattedDate = date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'UTC'
        });

        return formattedDate;
    };
    return (
        <div className='w-3/4 mx-auto'>
            <h1 className='text-center text-3xl font-bold mb-10'>Payment History</h1>

            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className='text-lg font-bold'>
                                <th>SL</th>
                                <th>Price</th>
                                <th>TransactionId</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody className='text-lg font-semibold'>
                            {
                                paymentHistory.map((row, index) => <tr key={row._id}>
                                    <td>{index + 1}</td>
                                    <td>$ {row.price} </td>
                                    <td>{row.transactionId}</td>
                                    <td>{formatDate(row.date)}</td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
}

export default PaymentHistory;