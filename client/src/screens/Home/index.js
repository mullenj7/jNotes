import React, { useEffect, useContext, useState } from 'react'
import { Box } from '@mui/material'

import Note from '../../components/Note'
import NoteList from '../../components/Lists/NoteList'
import { UserContext } from '../../context/UserContext'

const Home = () => {

    const { checkUserDetails, userDetails, getAllNotes, userNotes, saveNote } = useContext(UserContext);
    const [noteIndex, setNoteIndex] = useState(0);
    const [selectedNote, setSelectedNote] = useState([])

    const handleSave = async (note) => {
        console.log(JSON.stringify(note.children))
        console.log(typeof (JSON.stringify(note.children)))
        const body = {
            title: "helloooo",
            content: JSON.stringify(note.children)
        }
        await saveNote(body)
    }


    useEffect(() => {
        console.log('getting user details')
        checkUserDetails();
    }, [])

    // useEffect(() => {
    //     console.log(userNotes)
    // }, [userNotes])

    useEffect(() => {
        console.log('user notes ', userNotes)
        if (userNotes.length > 0) {
            setSelectedNote((userNotes[noteIndex]))
        }
    }, [noteIndex, userNotes])

    useEffect(() => {
        if (userDetails && userDetails.email) {
            getAllNotes();
        }
    }, [userDetails])

    return (
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', flexDirection: 'row', bgcolor: 'red', py: 8, maxHeight:'70vh' }}>
            <Box sx={{ bgcolor: 'blue', width: '20%', display:'flex', flexDirection:'column'}}>
                <NoteList notes={userNotes} setNoteIndex={setNoteIndex} />
            </Box>
            {/* <Box sx={{ bgcolor: 'red' }}>hello</Box> */}
            <Box sx={{ bgcolor: 'green', width: '80%', mx: 5, display:'flex',flexDirection:'column' }}>
                <Note handleSave={handleSave} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
            </Box>
        </Box>
    )
}

export default Home