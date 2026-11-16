import React, { useEffect, useContext, useState } from 'react'
import { Box, List, ListItemButton, ListItemText } from '@mui/material'
import MiniNote from '../../MiniNote'

const NoteList = ({ notes, setNoteIndex, noteIndex }) => {

    //const { checkUserDetails, userDetails, getAllNotes, userNotes, saveNote } = useContext(UserContext);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        setNoteIndex(index)
    };

    return (
        // <Box style={{ overflow: 'auto' }}>
        //     {
        //         notes && notes.length > 0 &&
        //         notes.map((n, i) => {
        //             return <MiniNote note={n} handleClick={() => { console.log('clicked'); setNoteIndex(i) }} />
        //         })
        //     }

        // </Box>
        <Box style={{ overflow: 'auto' }}>
            <List>
                {
                    notes && notes.length > 0 &&
                    notes.sort((a, b) => new Date(b.LastUpdated) - new Date(a.LastUpdated)).map((n, i) => {
                        return (
                            // <ListItemButton key={`note-list-${i}`}>
                                <MiniNote note={n} handleClick={() => { setNoteIndex(i) }} index={i} selectedIndex={noteIndex} key={`note-list-item-${i}`}/>
                            // </ListItemButton>
                        )
                    })
                }
            </List>
        </Box>
    )
}

export default NoteList