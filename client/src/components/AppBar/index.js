import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha, styled } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Button, IconButton, Typography, Menu } from '@mui/material';

import Container from '@mui/material/Container';
import PersonIcon from '@mui/icons-material/Person';

import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

export default function AppAppBar({ userDetails, handleUserSignOut }) {

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const dropdownOpen = Boolean(anchorEl);

    const handleSignOut = () => {
        setAnchorEl(false)
        handleUserSignOut();
    }



    return (
        <AppBar
            position="static"
            //enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
                        {/* <Sitemark /> */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Button variant="text" color="info" size="small">
                                Features
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Testimonials
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Highlights
                            </Button>
                            <Button variant="text" color="info" size="small">
                                Pricing
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                FAQ
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                                Blog
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        {userDetails && userDetails.email ?
                            <><IconButton
                                onClick={(event) => setAnchorEl(event.currentTarget)}
                            >
                                <PersonIcon sx={{}} />
                            </IconButton><Menu
                                id="client-settings"
                                anchorEl={anchorEl}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                keepMounted
                                sx={{ p: 0, m: 0 }}
                                open={dropdownOpen}
                                onClose={() => setAnchorEl(false)}
                            >

                                    <MenuItem
                                        onClick={handleSignOut}>
                                        <Typography align="left" color='primary'>
                                            {'Log Out'}
                                        </Typography>
                                    </MenuItem>
                                </Menu></> :
                            <Button color="primary" variant="outlined" size="small" onClick={() => { navigate('/login') }}>
                                Sign in
                            </Button>
                        }
                        {/* <Button color="primary" variant="contained" size="small">
                            Sign up
                        </Button> */}
                    </Box>

                </StyledToolbar>
            </Container>
        </AppBar>
    );
}