import React, { useEffect, useState, } from 'react'
import { Box, Card, CardContent, Typography, CardActions, Button, TextField, Grid, Divider } from '@mui/material'
import NoteList from '../../Lists/NoteList'
import MiniNote from '../../MiniNote'


const FullscreenNotePage = ({ notes, noteIndex, initialNoteValue, searchText, enableSave, setNoteIndex, setFullScreenNotesDialogOpen, setSearchText, }) => {

    const handleListItemClick = (index) => {
        setNoteIndex(index)
        setFullScreenNotesDialogOpen(false)
        setSearchText('')
    };


    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8, flexGrow: 1, width: '50%' }}>
                    <TextField placeholder='Search...' size='small' fullWidth sx={{}} value={searchText} onChange={(event) => { setSearchText(event.target.value); }} />
                </Box>
                <Divider orientation='horizontal' sx={{ width: '80%', }} />
            </Box>
            <Grid container rowSpacing={2} columnSpacing={3} sx={{ my: 3, mx: 8, overflow: 'auto' }}>
                {
                    notes && notes.length > 0 &&
                    notes.map((n, i) => {
                        return (
                            <MiniNote note={n} handleClick={() => { handleListItemClick(i) }} index={i} selectedIndex={noteIndex} key={`fs-note-list-item-${i}`} 
                                initialNoteValue={n.content ? JSON.parse(n.content) : initialNoteValue} searchText={searchText} />
                        )
                    })
                }
            </Grid>
        </Card>
    )
}

export default FullscreenNotePage