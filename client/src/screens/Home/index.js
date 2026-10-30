import React, { useEffect, useContext } from 'react'
import { Box } from '@mui/material'

import Note from '../../components/Note'
import NoteList from '../../components/Lists/NoteList'
import { UserContext } from '../../context/UserContext'

const Home = () => {

    const { checkUserDetails, userDetails, getAllNotes, userNotes, saveNote } = useContext(UserContext);

    const handleSave = async (note) => {
        console.log(JSON.stringify(note.children))
        console.log(typeof (JSON.stringify(note.children)))
        const body = {
            title: "test",
            content: JSON.stringify(note.children)
        }
        await saveNote(body)
    }


    useEffect(() => {
        console.log('echking 1')
        checkUserDetails();
    }, [])

    useEffect(() => {
        console.log(userNotes)
    }, [userNotes])

    useEffect(() => {
        if (userDetails && userDetails.email) {
            getAllNotes();
        }
    }, [userDetails])

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Box>
                <NoteList notes={userNotes} />
            </Box>
            {/* <Box sx={{ bgcolor: 'red' }}>hello</Box> */}
            <Box>
                <Note handleSave={handleSave} />
            </Box>
        </Box>
    )
}

export default Home