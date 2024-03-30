import React from "react";
import { Box, Container } from "@mui/material";
import { CustomDrawerHeader ,drawerWidth} from "../Sider/SideStyle";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../../Snackbar/CustomSnackbar";
import { useSnackbar } from "../../../hooks";

const MainContainer = () => {
  const { snackbar, handleSnackbarOpen, handleSnackbarClose } = useSnackbar();
  return (
    <Container
      component="main"
      maxWidth='auto'
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <CustomDrawerHeader />
      <Box sx={{ paddingX: 1, paddingY: 1 }}>
        <Outlet context={[handleSnackbarOpen]} />
      </Box>

      <CustomSnackbar
        type={snackbar.type}
        text={snackbar.text}
        open={snackbar.open}
        handleClose={handleSnackbarClose}
      />
    </Container>
  );
};

export default MainContainer;
