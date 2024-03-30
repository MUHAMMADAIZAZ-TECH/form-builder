import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import MuiAlert from "@mui/material/Alert";

function SlideTransition(props) {
  return <Slide {...props} direction="left" />;
}

export default function CustomSnackbar({ open, handleClose, text, type }) {
  return (
    <div>
      <Snackbar
        sx={{ marginTop: 8 }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
        autoHideDuration={3000}
      >
        <MuiAlert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {text}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
