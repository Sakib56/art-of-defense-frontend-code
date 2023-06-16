import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Instructors from "../Pages/Instructors/Instructors";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Dashboard from "../Layout/Dashboard";
import PrivateRoute from "./PrivateRoute";
import MySelectedClasses from "../Pages/Dashboard/Students/MySelectedClass";
import Payment from "../Pages/Dashboard/Students/Payment";
import MyEnrolledClasses from "../Pages/Dashboard/Students/MyEnrolledClasses";
import PaymentHistory from "../Pages/Dashboard/Students/PaymentHistory";
import InstructorHome from "../Pages/Dashboard/Instructor/InstructorHome";
import AddAClass from "../Pages/Dashboard/Instructor/AddAClass";
import InstructorAllClasses from "../Pages/Dashboard/Instructor/InstructorAllClasses";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import StudentRoute from "./StudentRoute";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/instructors',
                element: <Instructors></Instructors>
            },
            {
                path: '/classes',
                element: <AllClasses></AllClasses>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'mySelectedClass',
                element: <StudentRoute><PrivateRoute><MySelectedClasses></MySelectedClasses></PrivateRoute></StudentRoute>
            },
            {
                path: 'payment/:id',
                element: <StudentRoute><Payment></Payment></StudentRoute>
            },
            {
                path: 'myEnrolledClasses',
                element: <StudentRoute><MyEnrolledClasses></MyEnrolledClasses></StudentRoute>
            },
            {
                path: 'paymentHistory',
                element: <StudentRoute><PaymentHistory /></StudentRoute>
            },
            {
                path: 'instructor',
                element: <InstructorRoute><InstructorHome></InstructorHome></InstructorRoute>
            },
            {
                path: 'addAClass',
                element: <InstructorRoute><AddAClass></AddAClass></InstructorRoute>
            },
            {
                path: 'instructorClasses',
                element: <InstructorRoute><InstructorAllClasses></InstructorAllClasses></InstructorRoute>
            },
            {
                path: 'adminHome',
                element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
            },
            {
                path: 'manageClasses',
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            }

        ]
    },
    {
        path: "*",
        element: <ErrorPage></ErrorPage>
    }
]);

export default router;