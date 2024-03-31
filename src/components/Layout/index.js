import { Box, CssBaseline } from '@mui/material';
import React from 'react'
import Header from './Header/Header';
import MainContainer from './Container/MainContainer';

const Layout = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header />
            <MainContainer />
        </Box>
    )
}

export default Layout