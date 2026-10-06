import React, { useState, useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import {
    AppBar, Box, Toolbar, IconButton, ButtonBase,
    Typography, MenuItem, Menu, Divider, Link,

} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import BoltIcon from '@mui/icons-material/Bolt';




function AppComponent({ children, signOut, user, }) {

    return (
        <BrowserRouter>
            <Box sx={{ minHeight: '100vh' }}>
                <AppLayout
                    children={children}
                    signOut={signOut}
                    user={user}
                >
                </AppLayout>
                {/* <Box sx={{ minHeight: 150, display: 'flex', justifyContent: 'space-evenly', alignItems: 'flex-end', pb: 4 }}>
                    <Typography variant='subtitle2'>
                        Test
                    </Typography>
                    <Box sx={{}}>
                        <Typography variant='subtitle2' sx={{ color: 'white' }}>
                            {`Contact: `}
                        </Typography>
                        <Typography variant='subtitle2' >
                            {` jasonmullen189@gmail.com`}
                        </Typography>
                    </Box>

                </Box> */}

            </Box>
        </BrowserRouter>
    );
}

function AppLayout({ children, signOut, user }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const dropdownOpen = Boolean(anchorEl);


    const handleSignIn = () => {

    }
    const handleSignOut = () => {

    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', }}>
            <AppBar position='static' elevation={0} sx={{ py: 1, }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box>
                        <ButtonBase sx={{ ml: 5 }} onClick={() => { navigate('/home') }}>
                            <Typography variant="h3" color='primary' sx={{ color: 'white', typography: { lg: 'h3', xl: 'h3' } }} >
                                JNotes
                            </Typography>
                        </ButtonBase>
                    </Box>
                    <IconButton
                        onClick={(event) => setAnchorEl(event.currentTarget)}
                    >
                        <PersonIcon sx={{ color: 'white' }} />
                    </IconButton>
                    <Menu
                        id="client-settings"
                        anchorEl={anchorEl}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        keepMounted
                        sx={{ p: 0, m: 0 }}
                        open={dropdownOpen}
                        onClose={() => setAnchorEl(false)}
                    >
                        {user && user.signInDetails && user.signInDetails.loginId &&
                            <>
                                <Typography align="left" sx={{ p: 2 }}>{user.signInDetails.loginId}</Typography>
                                <Divider variant="middle" />
                                <MenuItem
                                    onClick={() => {
                                        navigate('/decks', { replace: true }); setAnchorEl(false);
                                    }}>
                                    <Typography align="left" color='primary'>
                                        My Decks
                                    </Typography>

                                </MenuItem>
                            </>
                        }
                        <MenuItem
                            onClick={user ? handleSignOut : handleSignIn}>
                            <Typography align="left" color='primary'>
                                {user ? 'Log Out' : 'Log In'}
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box sx={{ flexGrow: 1, height: '100%', display: 'flex', flexDirection: 'column', bgcolor:'white' }}>
                {children}
            </Box>
        </Box >
    )
}

export default AppComponent;