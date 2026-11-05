import React, { useEffect, useContext } from 'react'
import { Box } from '@mui/material'
import MiniNote from '../../MiniNote'

const NoteList = ({ notes }) => {

    //const { checkUserDetails, userDetails, getAllNotes, userNotes, saveNote } = useContext(UserContext);


    return (
        <Box>
            {
                notes && notes.length > 0 &&
                notes.map((n, i) => {
                    return <MiniNote note={n} />
                })
            }
        </Box>
    )
}

export default NoteList