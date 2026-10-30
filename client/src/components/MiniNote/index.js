import React, { useEffect, useContext } from 'react'
import { Box } from '@mui/material'



const MiniNote = ({note}) => {

   

    return (
        <Box>
            {note.id}
        </Box>
    )
}

export default MiniNote