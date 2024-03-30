import { Box, CssBaseline, Drawer, Hidden } from '@mui/material';
import React, { useState } from 'react'
import { CustomDrawer } from '..';
import Header from './Header/Header';
import MainContainer from './Container/MainContainer';
import { SiderMenus } from './Sider/Menus';

const drawerWidth = 260;

const PlatformLayout = () => {
    const [open, setOpen] = useState(false); // Adjust the breakpoint as needed
    const drawerMenu = SiderMenus ?? [];

    const handleDrawer = () => {
        setOpen(!open);
    };
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header open={open} handleDrawer={handleDrawer} />
            <Box
                component="nav"
                aria-label="mailbox folders"
            >
                <Hidden smUp>
                    <Drawer
                        variant="temporary"
                        open={open}
                        onClose={handleDrawer}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        <CustomDrawer open={open} items={drawerMenu} openDrawer={handleDrawer} mobile />
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <CustomDrawer open={open} items={drawerMenu} openDrawer={handleDrawer} />
                </Hidden>
            </Box>
            <MainContainer />
        </Box>
    )
}

export default PlatformLayout