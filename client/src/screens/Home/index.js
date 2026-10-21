import React, { useEffect, useContext } from 'react'
import { Box } from '@mui/material'

import Note from '../../components/Note'
import { UserContext } from '../../context/UserContext'

const Home = () => {

    const { checkUserDetails } = useContext(UserContext);


    useEffect(() => {
        checkUserDetails();
    }, [])

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Note />
            </Box>
        </Box>
    )
}

export default Home