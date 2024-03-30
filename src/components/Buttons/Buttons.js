import React from "react";
import Button from "@mui/material/Button";

const CustomButton = ({
  backgroundColor,
  variant,
  onClick,
  children,
  startIcon,
  endIcon,
  disabled,
  sx: additionalStyles,
  color,
  fullWidth,
  type
}) => {
  return (
    <Button
      sx={{
        fontSize: "0.772rem",
        backgroundColor: { backgroundColor },
        "&:hover": {
          backgroundColor: { backgroundColor },
        },
        padding: "5px 10px",
        ...additionalStyles,
      }}
      variant={variant}
      onClick={onClick}
      color={color}
      startIcon={startIcon || null}
      endIcon={endIcon || null}
      disabled={disabled || false}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </Button>
  );
};

export { CustomButton };
