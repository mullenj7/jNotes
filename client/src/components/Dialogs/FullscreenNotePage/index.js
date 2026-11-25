import React, { useEffect, useState, } from 'react'
import { Box, Card, CardContent, Typography, CardActions, Button, TextField, Grid, Divider, IconButton, Tooltip } from '@mui/material'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import GradeIcon from '@mui/icons-material/Grade';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import NoteList from '../../Lists/NoteList'
import MiniNote from '../../MiniNote'


const FullscreenNotePage = ({ notes, noteIndex, initialNoteValue, searchText, enableSave, setNoteIndex, setFullScreenNotesDialogOpen, setSearchText, }) => {

    const [favouriteEnabled, setFavouriteEnabled] = useState(false)

    const handleListItemClick = (index) => {
        setNoteIndex(index)
        setFullScreenNotesDialogOpen(false)
        setSearchText('')
    };


    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '95vh' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 8, pb: 6, flexGrow: 1, width: '45%' }}>
                    <TextField placeholder='Search...' size='small' fullWidth sx={{}} value={searchText} onChange={(event) => { setSearchText(event.target.value); }} />
                    <Tooltip title={'Filter'}>
                        <IconButton onClick={() => { console.log('hello') }} sx={{ ml: 2 }}>
                            <FilterAltOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={'Show Favourites'}>
                        <IconButton sx={{ color: 'gold', ml: 1 }} onClick={() => { setFavouriteEnabled(!favouriteEnabled) }}>
                            {!favouriteEnabled ? <StarBorderIcon /> : <GradeIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>
                <Divider orientation='horizontal' sx={{ width: '80%', }} />
            </Box>
            <Grid container rowSpacing={2} columnSpacing={4} sx={{ my: 3, mx: 8, overflow: 'auto' }}>
                {
                    notes && notes.length > 0 &&
                    notes.filter((n) => { return !favouriteEnabled ? n : n.favourite }).map((n, i) => {
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