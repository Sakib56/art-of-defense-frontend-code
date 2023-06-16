import React, { createContext, useEffect, useState } from 'react';
import app from '../Firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from 'axios';

export const AuthContext = createContext()
const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            setLoading(false)
            // console.log('current User ', currentUser)

            // set jwt token local storage
            if (currentUser) {
                axios.post('https://art-of-defense-server-side-sakib56.vercel.app/jwt', { email: currentUser.email })
                    .then(data => {
                        // console.log(data.data)
                        localStorage.setItem('access-token', data.data)
                        // setLoading(false)
                    })

            }
            else {
                localStorage.removeItem('access-token')
            }

        });
        return () => {
            return unsubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        loginUser,
        logoutUser,
        googleLogin,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;