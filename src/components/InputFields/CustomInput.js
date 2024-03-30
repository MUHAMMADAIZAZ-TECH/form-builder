import React from "react";
import {
  InputLabel, FormControl,
  MenuItem, Select, FormHelperText, TextField,
} from "@mui/material";

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
}) => {
  return (
    <FormControl
      sx={{ minWidth: 120, ...sx }}
      error={error && error}
      required size={size}
      disabled={disabled}
    >
      {label && <InputLabel id={`select-label-${label}`}>{label}</InputLabel>}
      <Select
        labelId={`select-label-${label}`}
        id={`select-${label}`}
        value={value}
        label={label}
        name={name}
        onChange={handleChange}
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
    </FormControl>
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
    <TextField
      multiline={multiline}
      minRows={rows || minRows}
      name={name}
      disabled={disabled}
      id={id || label}
      label={label}
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
      InputProps={InputProps}
      inputProps={inputProps}
      InputLabelProps={InputLabelProps}
    />
  );
};
export {
  SelectBox,
  InputField,
};
