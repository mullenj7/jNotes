import React, { useEffect, useContext } from 'react'
import { Box, Card, CardContent, Typography, CardActions, Button } from '@mui/material'



const MiniNote = ({ note, handleClick }) => {

    //console.log(note)

    return (
        <Card onClick={handleClick} sx={{}}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {note.title}
                </Typography>
                <Typography variant="h5" component="div">
                    be.nev.o.lent
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    )
}

export default MiniNote