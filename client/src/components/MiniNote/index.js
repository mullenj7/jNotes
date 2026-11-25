import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Box, Card, CardContent, Typography, CardActions, Button, CardActionArea, Grid, ListItemButton } from '@mui/material'
import { Slate, withReact, Editable } from "slate-react"
import { withHistory } from 'slate-history'
import { Editor, Node, Transforms, createEditor, select } from 'slate'



const MiniNote = ({ note, handleClick, index, selectedIndex, initialNoteValue, searchText='', isFullscreen = false }) => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), [])
    const [showNote, setShowNote] = useState(true)
    const [date, setDate] = useState('')
    const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    useEffect(() => {
        if (note.content) {
            const content = JSON.parse(note.content)
            editor.children = content
            editor.onChange()
        }
        if (note.LastUpdated) {
            const d = new Date(note.LastUpdated)
            setDate(d.toLocaleDateString("en-GB", dateOptions))
        }
    }, [note])

    useEffect(() => { // filter by search text
        setShowNote(false)
        const allText = editor.children // get all text in note
            .map((node) => Editor.string(editor, [], { from: [editor.children.indexOf(node)] }) || Node.string(node))
            .join('').toLowerCase()
        if ((note.title && note.title.toLowerCase().includes(searchText.toLowerCase())) || allText.includes(searchText.toLowerCase())) {
            setShowNote(true)
        }
        else setShowNote(false)

    }, [searchText])



    return (
        <Grid size={4} sx={{ display: ((searchText !== '' && showNote === true) || (searchText === '')) ? 'auto' : 'none' }}>
            <Card sx={{ m: 2, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', bgcolor: 'purple', overflow: 'hidden', }}>
                <ListItemButton sx={{ p: 0, m: 0 }} autoFocus={selectedIndex === index ? true : false}>
                    <CardActionArea
                        onClick={() => handleClick()}
                        data-active={selectedIndex === index ? '' : undefined}
                        sx={{
                            height: '100%',
                            display: 'flex', justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start', overflow: 'hidden',
                            '&[data-active]': {
                                backgroundColor: 'white',
                                '&:hover': {
                                    backgroundColor: 'action.selectedHover',
                                },
                            },
                        }}
                    >
                        <CardContent sx={{ bgcolor: 'red', m: 1, overflow: 'hidden', height: 200, }}>
                            <Typography noWrap variant='subtitle2' gutterBottom sx={{ color: 'text.secondary', maxWidth: 150 }}>
                                {note.title}
                            </Typography>
                            <Typography variant='subtitle2' sx={{ color: 'text.secondary', mb: 1.5, }}>
                                {(date)}
                            </Typography>
                            <Slate editor={editor} initialValue={initialNoteValue}>
                                <Editable readOnly />
                            </Slate>

                            {/* <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                        {note.title}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {note.id}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography> */}
                        </CardContent>
                    </CardActionArea>
                    {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
                </ListItemButton>
            </Card>
        </Grid>
    )
}

export default MiniNote