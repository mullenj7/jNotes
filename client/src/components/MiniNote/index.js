import React, { useEffect, useContext } from 'react'
import { Box, Card, CardContent, Typography, CardActions, Button, CardActionArea } from '@mui/material'



const MiniNote = ({ note, handleClick, index, selectedIndex }) => {

    //console.log(note)

    return (
        <Card sx={{ m: 2 }}>
            <CardActionArea
                onClick={() => handleClick()}
                data-active={selectedIndex === index ? '' : undefined}
                sx={{
                    height: '100%',
                    '&[data-active]': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                            backgroundColor: 'action.selectedHover',
                        },
                    },
                }}
            >
                <CardContent>
                    <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
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
                    </Typography>
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    )
}

export default MiniNote