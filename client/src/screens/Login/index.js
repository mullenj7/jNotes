import React, { useEffect, useContext } from 'react'
import { Box } from '@mui/material'

import SignIn from '../SignIn'
import { UserContext } from '../../context/UserContext'

const Home = () => {

  

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <SignIn/>
        </Box>
    )
}

export default Home