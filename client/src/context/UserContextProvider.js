import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from './UserContext';
import { AppContext } from './AppContext';
import { getUser } from '../utils/api/users'
import { signIn, signUp } from '../utils/api/auth'

function UsersProvider(props) {
    const { setLoading } = useContext(AppContext);
    const [userDetails, setUserDetails] = useState({});
    const [userSignedIn, setUserSignedIn] = useState(false);

    const handleSignInChange = async () => {
        setLoading(true);

        if (userSignedIn === true) {
            await fetchUserDetails();
        }
        else { setUserDetails({}); }
        setLoading(false);
    };


    useEffect(() => {
        setLoading(true);
        checkUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        handleSignInChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userSignedIn]);

    const handleSignIn = async (email, password) => {
        const { token, user } = await signIn(email, password);
        if (!token || token === 'null' || token === 'undefined') {
            throw new Error()
        }
        localStorage.setItem("token", token)
        localStorage.setItem("id", user.id)
    }

    const handleSignUp = async (body) => {
        await signUp(body);
    }

    const checkUserDetails = async () => {
        try {
            const token = localStorage.getItem("token")
            if (token && token !== "null" && token !== "undefined") {
                setUserSignedIn(true);
            } else setUserSignedIn(false);
        }
        catch (e) {
            console.log(e);
            setUserSignedIn(false);
            setLoading(false);
        }

    };


    const fetchUserDetails = async () => {
        try {
            const response = await getUser();
            if (response.errorMessage) {
                throw new Error(response.errorMessage);
            }
            setUserDetails(response);

        } catch (error) {
            console.error(error);

            throw new Error(error);
        }
        return null;
    };

    // const updateUserAttributes = async (attributes) => {
    //     try {
    //         const response = await updateUser(attributes);
    //         if (response.errorMessage) {
    //             throw new Error(response.errorMessage);
    //         }
    //         // await getCurrentUser();
    //         // await fetchAuthSession();
    //         fetchUserDetails();
    //         return response;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };



    return (
        <UserContext.Provider
            value={{
                userDetails, setUserDetails, fetchUserDetails, checkUserDetails,
                userSignedIn, setUserSignedIn, handleSignIn, handleSignUp
                //updateUserAttributes, 
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

UsersProvider.propTypes = {
    appContext: PropTypes.object,
    children: PropTypes.node,
};

export default UsersProvider;
