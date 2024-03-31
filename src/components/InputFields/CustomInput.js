import React from "react";
import {
  InputLabel, Checkbox,
  MenuItem, Select, FormHelperText, TextField, FormControlLabel, styled, Switch, Radio,
} from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTime } from "luxon";
const SelectBox = ({
  label,
  options,
  helperText,
  value,
  onChange,
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
        onChange={onChange}
        sx={{ borderRadius: 2, bgcolor: 'white', ...sx, minWidth: '40%' }}
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
  InputLabelProps,
  placeholder,
  onKeyPress
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
        sx={{ minWidth: '40%', ...sx }}
        placeholder={placeholder}
        InputProps={{
          style: { borderRadius: 10, backgroundColor: 'white', ...InputProps?.style }, // Applying border radius to input
          ...InputProps // Spread any additional props passed to InputProps
        }}
        onKeyPress={onKeyPress}
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

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {label && <InputLabel sx={{ color: "#0F172A", fontSize: 13, fontWeight: 600, lineHeight: 2.5 }}>{label}</InputLabel>}
      <Checkbox checked={checked} onChange={onChange} />
    </div>
  );
};

const CustomRadioButton = ({ label, value, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {label && <InputLabel sx={{ color: "#0F172A", fontSize: 13, fontWeight: 600, lineHeight: 2.5 }}>{label}</InputLabel>}
      <Radio checked={checked} onChange={onChange} value={value} />
    </div>
  );
};
const CustomSwitch = ({
  checked,
  onChange,
  label,
  disabled,
  name
}) => {
  return (
    <>
      {label && <InputLabel sx={{ color: "#0F172A", fontSize: 13, fontWeight: 600, lineHeight: 2.5 }}>{label}</InputLabel>}
      <IOSSwitch
        name={name}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </>
  );
};

const CustomDatePicker = ({
  name,
  label,
  value,
  onChange,
  error,
  required,
  size = 'small',
  helperText,
  width,
  disabled,
  disableFuture, // new prop to disable future dates
  disablePast,   // new prop to disable past dates
}) => {
  const currentDate = DateTime.fromJSDate(new Date());

  return (
    <DatePicker
      sx={{ width, backgroundColor: 'white', minWidth: '40%' }}
      disabled={disabled}
      label={label}
      value={value ? DateTime.fromISO(value) : null}
      onChange={(newValue) =>
        onChange({
          target: {
            name,
            value: newValue ? DateTime.fromISO(newValue).toISODate() : '',
          },
        })
      }
      required={required}
      maxDate={disableFuture ? currentDate : undefined} // set maxDate if disableFuture is true
      minDate={disablePast ? currentDate : undefined}  // set minDate if disablePast is true
      slotProps={{
        textField: {
          helperText: error ? helperText : false,
          error,
          size,
          name,
          required,
        },
      }}

    />
  );
};
export {
  SelectBox,
  InputField,
  CustomSwitch,
  CustomDatePicker,
  CustomRadioButton,
  CustomCheckbox
};
