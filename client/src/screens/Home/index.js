import React, { useEffect, useContext, useState } from 'react'
import { Box, IconButton, TextField, Dialog, Drawer, DrawerHeader, Button } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import FullscreenRoundedIcon from '@mui/icons-material/FullscreenRounded';
import Note from '../../components/Note'
import NoteList from '../../components/Lists/NoteList'
import { UserContext } from '../../context/UserContext'
import ConfirmationDialog from '../../components/Dialogs/ConfirmationDialog';
import FullscreenNotePage from '../../components/Dialogs/FullscreenNotePage';

const Home = () => {

    const { checkUserDetails, userDetails, getAllNotes, userNotes, saveNote, updateNoteDetails, deleteUserNote } = useContext(UserContext);
    const [noteIndex, setNoteIndex] = useState(0);
    const [selectedNote, setSelectedNote] = useState([])
    const [newNoteState, setNewNoteState] = useState({})
    const [deleteNoteDialogOpen, setDeleteNoteDialogOpen] = useState(false)
    const [fullscreenSearchText, setFullScreenSearchText] = useState('')

    const [enableSave, setEnableSave] = useState(false)
    const [leaveNoteDialogOpen, setLeaveNoteDialogOpen] = useState(false)
    const [leaveNewNoteDialogOpen, setLeaveNewNoteDialogOpen] = useState(false)
    const [nextNoteIndex, setNextNoteIndex] = useState(0)
    const [drawerOpen, setDrawerOpen] = useState(true)
    const [fullScreenNotesDialogOpen, setFullScreenNotesDialogOpen] = useState(false)

    const [newNoteDialogOpen, setNewNoteDialogOpen] = useState(false)
    const initialNoteValue = [{ "type": "paragraph", "children": [{ "text": "" }] }]


    const handleSaveNote = async (editorNote, title, favourite) => {
        const body = {
            title: title,
            content: JSON.stringify(editorNote.children),
            favourite: favourite
        }
        console.log('body is ',body)
        await updateNoteDetails(selectedNote.id, body)
        await getAllNotes()
    }


    const handleCreateNote = async (editorNote, title, favourite) => {
        const body = {
            title: title,
            content: JSON.stringify(editorNote.children),
            favourite: favourite
        }
        await saveNote(body)
        await getAllNotes()
        setNewNoteDialogOpen(false)
        setNoteIndex(0)
    }

    const handleDeleteNote = async () => {
        await deleteUserNote(selectedNote.id)
        await getAllNotes();
        setDeleteNoteDialogOpen(false)
    }

    const handleClickAddNote = () => {
        //setSelectedNote({})
        setNewNoteDialogOpen(true)
    }

    const handleCloseDialog = () => {
        if (!enableSave) {
            setNewNoteState({})
            setNewNoteDialogOpen(false)
        }
        else setLeaveNewNoteDialogOpen(true)
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
            <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', flexDirection: 'row', bgcolor: 'red', py: 5, height: '70vh', filter: newNoteDialogOpen ? 'blur(2px)' : 'none' }}>
                <Box sx={{ bgcolor: 'blue', width: drawerOpen ? '20%' : '5%', display: 'flex', flexDirection: 'column', ml: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'white', }}>
                        {drawerOpen ?
                            <>
                                <Button variant='outlined' fullWidth onClick={() => { setFullScreenNotesDialogOpen(true); }}>Browse Notes</Button>
                                <IconButton onClick={() => { handleClickAddNote(); }}>
                                    <AddBoxOutlinedIcon fontSize="small" sx={{ color: 'blue', p: 0, m: 0, }} />
                                </IconButton>
                                <IconButton onClick={() => { setDrawerOpen(!drawerOpen); }}>
                                    <ChevronLeftIcon fontSize="small" sx={{ color: 'blue', p: 0, m: 0, }} />
                                </IconButton>
                            </>
                            :
                            <IconButton onClick={() => { setDrawerOpen(!drawerOpen) }}>
                                <ChevronRightIcon fontSize="small" sx={{ color: 'blue', p: 0, m: 0, }} />
                            </IconButton>}
                    </Box>
                    {/* <Collapse orientation='horizontal' in={drawerOpen} > */}
                    {drawerOpen &&
                        <NoteList notes={userNotes} setNoteIndex={setNoteIndex} noteIndex={noteIndex} enableSave={enableSave} setLeaveNoteDialogOpen={setLeaveNoteDialogOpen} setNextNoteIndex={setNextNoteIndex}
                            initialNoteValue={initialNoteValue} />
                    }
                    {/* </Collapse> */}

                </Box>
                <Box sx={{ bgcolor: 'green', width: drawerOpen ? '80%' : '95%', mr: 3, display: 'flex', flexDirection: 'column' }}>
                    {!newNoteDialogOpen &&
                        <Note handleSave={handleSaveNote} selectedNote={selectedNote} setSelectedNote={setSelectedNote} initialNoteValue={initialNoteValue} setDeleteNoteDialogOpen={setDeleteNoteDialogOpen} enableSave={enableSave} setEnableSave={setEnableSave} />}
                </Box>
            </Box>
            <Dialog open={newNoteDialogOpen} onClose={() => { handleCloseDialog() }} fullWidth maxWidth='md' sx={{}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, height: '70vh', justifyContent: 'flex-start' }}>
                    <Note handleSave={handleCreateNote} selectedNote={newNoteState} setSelectedNote={setNewNoteState} initialNoteValue={initialNoteValue} isNewNote={true} enableSave={enableSave} setEnableSave={setEnableSave} />
                </Box>
            </Dialog>
            <Dialog open={fullScreenNotesDialogOpen} onClose={() => { setFullScreenSearchText(''); setFullScreenNotesDialogOpen(false) }} fullWidth maxWidth='lg' sx={{}}>
                <FullscreenNotePage notes={userNotes} setNoteIndex={setNoteIndex} noteIndex={noteIndex} enableSave={enableSave} setNextNoteIndex={setNextNoteIndex}
                    initialNoteValue={initialNoteValue} searchText={fullscreenSearchText} setSearchText={setFullScreenSearchText} setFullScreenNotesDialogOpen={setFullScreenNotesDialogOpen} />
            </Dialog>
            <ConfirmationDialog title={'Unsaved Changes'} body={'Are you sure you want to leave without saving?'} closeText={'Cancel'} submitText={'Yes'} onSubmit={() => { setNewNoteState({}); setLeaveNewNoteDialogOpen(false); setNewNoteDialogOpen(false) }} dialogOpen={leaveNewNoteDialogOpen} onClose={() => { setLeaveNewNoteDialogOpen(false) }} />
            <ConfirmationDialog title={'Unsaved Changes'} body={'Are you sure you want to leave without saving?'} closeText={'Cancel'} submitText={'Yes'} onSubmit={() => { setNoteIndex(nextNoteIndex); setLeaveNoteDialogOpen(false) }} dialogOpen={leaveNoteDialogOpen} onClose={() => { setLeaveNoteDialogOpen(false) }} />
            <ConfirmationDialog title={'Delete Note'} body={'Are you sure you want to delete this note?'} closeText={'Cancel'} submitText={'Delete'} onSubmit={() => { handleDeleteNote() }} dialogOpen={deleteNoteDialogOpen} onClose={() => { setDeleteNoteDialogOpen(false) }} />
        </>
    )
}

export default Home