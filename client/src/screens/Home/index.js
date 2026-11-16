import React, { useEffect, useContext, useState } from 'react'
import { Box, IconButton, TextField, Dialog } from '@mui/material'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import Note from '../../components/Note'
import NoteList from '../../components/Lists/NoteList'
import { UserContext } from '../../context/UserContext'

const Home = () => {

    const { checkUserDetails, userDetails, getAllNotes, userNotes, saveNote, updateNoteDetails } = useContext(UserContext);
    const [noteIndex, setNoteIndex] = useState(0);
    const [selectedNote, setSelectedNote] = useState([])
    const [searchText, setSearchText] = useState('')
    const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false)
    const initialNoteValue = [{ "type": "paragraph", "children": [{ "text": "" }] }]


    const handleSaveNote = async (editorNote, title) => {
        const body = {
            title: title,
            content: JSON.stringify(editorNote.children)
        }
        await updateNoteDetails(selectedNote.id, body)
        await getAllNotes()

    }


    const handleCreateNote = async (editorNote, title) => {
        const body = {
            title: title,
            content: JSON.stringify(editorNote.children)
        }
        await saveNote(body)
        await getAllNotes()

    }

    const handleClickAddNote = () => {
        console.log('hello')
        //setSelectedNote({ content: JSON.stringify(initialNoteValue), title: 'Title' })
        setSelectedNote({})
        setNewNoteDialogOpen(true)
    }

    useEffect(() => {
        //console.log('getting user details')
        checkUserDetails();
    }, [])


    useEffect(() => {
        if (userNotes.length > 0) {
            //console.log(userNotes[0])
            setSelectedNote((userNotes[noteIndex]))
        }
    }, [noteIndex, userNotes])

    useEffect(() => {
        if (userDetails && userDetails.email) {
            getAllNotes();
        }
    }, [userDetails])

    return (
        <>
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', flexDirection: 'row', bgcolor: 'red', py: 8, maxHeight: '70vh' }}>
                <Box sx={{ bgcolor: 'blue', width: '20%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex' }}>
                        <TextField placeholder='Search...' value={searchText} onChange={(event) => { setSearchText(event.target.value); }} sx={{}} />
                        <IconButton onClick={() => { handleClickAddNote() }}><AddBoxOutlinedIcon fontSize="small" sx={{ color: 'white', p: 0, m: 0, }} /></IconButton>
                    </Box>
                    <NoteList notes={userNotes} setNoteIndex={setNoteIndex} />
                </Box>
                {/* <Box sx={{ bgcolor: 'red' }}>hello</Box> */}
                <Box sx={{ bgcolor: 'green', width: '80%', mx: 5, display: 'flex', flexDirection: 'column' }}>
                    {!newNoteDialogOpen &&
                        <Note handleSave={handleSaveNote} selectedNote={selectedNote} setSelectedNote={setSelectedNote} initialNoteValue={initialNoteValue} />}
                </Box>
            </Box>
            <Dialog open={newNoteDialogOpen} onClose={() => { setNewNoteDialogOpen(false) }} fullWidth maxWidth='md' sx={{}}>
                <Box sx={{display: 'flex', flexDirection: 'column', flexGrow:1, height:'60vh', justifyContent:'flex-start'}}>
                <Note handleSave={handleCreateNote} selectedNote={selectedNote} setSelectedNote={setSelectedNote} initialNoteValue={initialNoteValue} />
                </Box>
            </Dialog>
        </>
    )
}

export default Home