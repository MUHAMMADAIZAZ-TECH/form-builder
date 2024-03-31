import React from "react";
import { MoreVert, NotificationsOutlined } from "@mui/icons-material";
import {
  Box, AppBar, Avatar,
  Tooltip, IconButton, Toolbar, Badge,
} from "@mui/material";
import { Logo } from "../../../assets/icons/svgicons";

export default function Header({ handleDrawer, open }) {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'var(--ds-surface, #2A4376) !important',
          color: 'var(--ds-text-subtlest, #6b778c) !important',
          boxShadow: '0px 0px 4px 1px rgba(0, 0.1, 0.1, 0.1), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 1px 0px 3px 0px rgba(0, 0, 0, 0.12) !important',
        }}
        open={open}
      >
        <Toolbar>
          <Box display='flex' width='100%' paddingLeft={3} paddingRight={3}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
            >
              <Logo />
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Tooltip title="Notifications">
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsOutlined htmlColor="white" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Account settings">
                <IconButton
                  size="small"
                  edge="end"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <Avatar sx={{ width: 40, height: 40 }}>AS</Avatar>
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
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
