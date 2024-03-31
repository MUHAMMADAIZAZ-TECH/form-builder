import React from "react";
import { Modal, Paper, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ open, onClose, children, width, maxHeight }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Paper
        sx={{
          position: 'relative', // Ensure close icon stays on top of the paper
          width: width || "80%",
          maxHeight: maxHeight || "80%",
          overflow: "auto",
          borderRadius: 3,
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Paper>
    </Modal>
  );
};

export default CustomModal;
