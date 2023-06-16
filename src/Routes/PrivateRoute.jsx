import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../Provider/AuthProvider';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const location = useLocation()

    if (loading) {
        return <div className='text-center'><ClipLoader
            color="#36d7b7"
            // loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> </div>;
    }

    if (user?.email) {
        return children;
    }
    return (
        <Navigate to='/login' state={{ from: location }} replace ></Navigate>
    );
};

export default PrivateRoute;