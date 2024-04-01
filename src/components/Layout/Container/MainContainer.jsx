import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import CustomSnackbar from "../../Snackbar/CustomSnackbar";
import { useSnackbar } from "../../../hooks";
import CustomBreadcrumbs from "../Header/Breadcrumbs";

const MainContainer = () => {
  const { snackbar, handleSnackbarOpen, handleSnackbarClose } = useSnackbar();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Container
      component="main"
      maxWidth='auto'
      sx={{ flexGrow: 1, p: 3, width: '100%', ml: { xl: '250px', lg: '250px', md: 0, sm: 0, xs: 0 } }}
    >
      <Box sx={{ paddingX: 1, paddingY: 1, mt: '56px' }}>
        <Box mt={2} mb={2}>
          <CustomBreadcrumbs pathnames={pathnames || []} />
        </Box>
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
