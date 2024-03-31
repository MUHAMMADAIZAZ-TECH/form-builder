import React from "react";
import {
  InputLabel, FormControl,
  MenuItem, Select, FormHelperText, TextField, FormControlLabel, styled, Switch,
} from "@mui/material";
import { CheckBox } from "@mui/icons-material";

const SelectBox = ({
  label,
  options,
  helperText,
  value,
  handleChange,
  error,
  sx,
  size = "small",
  disabled,
  name,
  fullWidth,
  required
}) => {
  return (
    <>
      {label && <InputLabel sx={{ color: "#0F172A", fontSize: 13, fontWeight: 600, lineHeight: 2.5 }}>{label}</InputLabel>}
      <Select
        value={value}
        name={name}
        onChange={handleChange}
        sx={{ borderRadius: 2, }}
        error={error && error}
        required={required}
        size={size}
        disabled={disabled}
        fullWidth={fullWidth}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((option, key) => (
          <MenuItem key={key} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
}
const InputField = ({
  id,
  label,
  value,
  defaultValue,
  helperText,
  onChange,
  fullWidth,
  variant,
  error,
  required,
  name,
  size = "small",
  disabled,
  multiline,
  rows,
  minRows,
  sx,
  type,
  InputProps,
  inputProps,
  InputLabelProps
}) => {
  return (
    <>
      {label && <InputLabel sx={{ color: "#0F172A", fontSize: 13, fontWeight: 600, lineHeight: 2.5 }}>{label}</InputLabel>}
      <TextField
        multiline={multiline}
        minRows={rows || minRows}
        name={name}
        disabled={disabled}
        id={id || label}
        value={value || ''}
        defaultValue={defaultValue}
        helperText={helperText}
        onChange={onChange}
        size={size}
        type={type}
        fullWidth={fullWidth || false}
        variant={variant || 'outlined'}
        error={error || false}
        required={required || false}
        sx={sx}
        InputProps={{
          style: { borderRadius: 10, backgroundColor: 'white', ...InputProps?.style }, // Applying border radius to input
          ...InputProps // Spread any additional props passed to InputProps
        }}
        inputProps={inputProps}
        InputLabelProps={InputLabelProps}
      /></>

  );
};
const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#6366F1',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const CustomSwitch = ({
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <>
      {label && <InputLabel sx={{ color: "#0F172A", fontSize: 13, fontWeight: 600, lineHeight: 2.5 }}>{label}</InputLabel>}
      <IOSSwitch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

export {
  SelectBox,
  InputField,
  CustomSwitch
};
