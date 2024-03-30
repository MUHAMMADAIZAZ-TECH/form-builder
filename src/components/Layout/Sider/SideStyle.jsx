
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
export const drawerWidth = 260;

export const CustomListItemText = styled(ListItemText)(({ fontSize, fontWeight }) => ({
    "& .MuiTypography-root": {
        fontSize: fontSize,
        fontWeight: fontWeight,
    },
}));

export const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    backgroundColor: '#EAEAEA',
});

export const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    backgroundColor: '#EAEAEA',
    width: `calc(${theme.spacing(6)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(7)} + 1px)`,
    },
});

export const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),

    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));
export const CustomDrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    minHeight: '56px !important'
}));
export const SiderItem = ({ icon, label, handleClick, open, fontWeight, index, style, selected }) => {
    return (
        <React.Fragment key={index}>
            <ListItemButton
                selected={selected}
                sx={{ paddingTop: "10px", paddingBottom: "10px" }}
                onClick={() => handleClick(label)}
            >
                <ListItemIcon sx={{ minWidth: 0, margin: "5px 15px 5px 0px", ...style }}>
                    {icon}
                </ListItemIcon>
                <CustomListItemText
                    primary={label}
                    fontSize="13px"
                    fontWeight={fontWeight ? fontWeight : "normal"}
                    sx={{ display: open ? 'block' : 'none', color: 'black' }}
                />
            </ListItemButton>
        </React.Fragment>
    );
};