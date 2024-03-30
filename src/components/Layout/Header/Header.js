import React from "react";
import { Apps, MoreVert } from "@mui/icons-material";
import {
  Box, AppBar, Avatar,
  Tooltip, IconButton, Toolbar, Typography,
} from "@mui/material";

export default function Header({ handleDrawer, open }) {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'var(--ds-surface, #ffffff) !important',
          color: 'var(--ds-text-subtlest, #6b778c) !important',
          height: '56px !important',
          boxShadow: '0px 0px 4px 1px rgba(0, 0.1, 0.1, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 1px 0px 3px 0px rgba(0, 0, 0, 0.12) !important',
        }}
        open={open}
      >
        <Toolbar sx={{ minHeight: '56px !important', }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
          >
            <Apps sx={{ fontSize: 25 }} />
          </IconButton>

          <Typography variant='h6' noWrap component="div"
            fontWeight='bold' 
            color='#1976D2'
            sx={{ display: { xs: "none", md: 'flex' } }}>
            Multi Factor Authenticator APP
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Account settings">
              <IconButton
                size="small"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-haspopup="true"
              color="inherit"
            >
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
