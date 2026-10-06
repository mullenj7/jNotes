import React, { useEffect } from 'react'
import { Box } from '@mui/material'

import Note from '../../components/Note'

const Home = () => {



    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Box>
                <Note />
            </Box>
        </Box>
    )
}

export default Home