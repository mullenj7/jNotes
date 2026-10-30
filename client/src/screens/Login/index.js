import React, { useEffect, useContext } from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { Box } from '@mui/material'

import SignIn from '../SignIn'
import SignUp from '../SignUp';
import { UserContext } from '../../context/UserContext'

const Login = () => {
    const { userSignedIn, userDetails } = useContext(UserContext)

    const location = useLocation();
    const { pathname } = location;

    return (
        <>
            {userSignedIn && userDetails && userDetails.email ?
                <Navigate replace to='/home' /> :
                pathname === '/login' ? <SignIn /> : <SignUp />}

        </>
    )
}

export default Login