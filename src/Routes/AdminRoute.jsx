import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../Provider/AuthProvider';
import useCheckUser from '../Hooks/useCheckUser';


const AdminRoute = ({ children }) => {
    const { user, loading, logoutUser } = useContext(AuthContext)
    const location = useLocation()
    const [data, isUserLoading] = useCheckUser()

    if (loading || isUserLoading) {
        return <div className='text-center'><ClipLoader
            color="#36d7b7"
            // loading={loading}
            // cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> </div>;
    }

    if (user?.email && data == 'admin') {
        return children;
    }
    return (
        <> <Navigate to='/login' state={{ from: location }} replace ></Navigate>
            {
                logoutUser()
                    .then(() => { })
                    .catch(error => console.log(error))
            }
        </>

    );
};

export default AdminRoute;