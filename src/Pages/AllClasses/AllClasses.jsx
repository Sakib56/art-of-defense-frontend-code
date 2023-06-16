import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import AllClassesCard from './AllClassesCard';
import useAuth from '../../Hooks/useAuth';

const AllClasses = () => {
    const [allClassesData, setAllClassesData] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const [role, setRole] = useState('')
    useEffect(() => {
        axios.get('https://art-of-defense-server-side-sakib56.vercel.app/allClasses')
            .then(res => {
                // console.log(res.data)
                // setAllClassesData(res.data)
                const result = res.data.filter(dt => dt.status == 'approved')
                setAllClassesData(result)
                setLoading(false)
            })
            .catch(error => console.error())
    }, [])
    useEffect(() => {
        fetch('https://art-of-defense-server-side-sakib56.vercel.app/userEmail')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                // console.log(user)
                const filterdata = data.filter(dt => dt.email == user?.email)
                console.log(filterdata[0]?.role)
                setRole(filterdata[0]?.role)

            });
    }, [user]);
    // console.log(allClassesData)
    console.log(role)
    return (
        <div className='my-8 lg:my-14 max-w-7xl mx-auto'>
            <h1 className='text-center font-bold text-3xl my-10'>All classes</h1>
            {
                loading ? <> <div className='text-center mt-10'><ClipLoader
                    color="#36d7b7"
                    // loading={loading}
                    // cssOverride={override}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                /> </div></> :
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                        {
                            allClassesData.map(classes => <AllClassesCard classes={classes} role={role} key={classes._id}>
                            </AllClassesCard>)
                        }
                    </div>
            }
        </div>
    );
};

export default AllClasses;