import React from 'react'
import { Box, FormControl, FormControlLabel, FormGroup, RadioGroup } from '@mui/material'
import { CustomCheckbox, CustomDatePicker, CustomRadioButton, InputField, SelectBox } from '../../components'

const TypeSelection = ({ field, handleChange, value, handleCheckboxChange, handleRadioChange }) => {
    return (
        <Box mt={2}>
            {field?.type === 'text' &&
                (<InputField
                    name={field.label}
                    value={value}
                    onChange={handleChange}
                />)}
            {field?.type === 'select' &&
                (<SelectBox
                    name={field.label}
                    value={value}
                    onChange={handleChange}
                    options={field.options || []}
                />)}
            {field?.type === 'date' &&
                (<CustomDatePicker
                    onChange={handleChange}
                    value={value}
                />)}
            {field?.type === 'checkbox' && (
                <FormGroup>
                    {field.options?.map((label, index) => (
                        <FormControlLabel
                            key={index}
                            control={
                                <CustomCheckbox
                                    checked={value === label}
                                    onChange={(e) => handleCheckboxChange(label, e.target.checked)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </FormGroup>
            )}
            {field?.type === 'radio' && (
                <FormControl>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        value={value}
                        onChange={(e) => handleRadioChange(e.target.value)}
                    >
                        {field?.options?.map((label, index) => (
                            <FormControlLabel
                                key={index}
                                value={label}
                                control={<CustomRadioButton />}
                                label={label}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            )}
        </Box>
    )
}

export default TypeSelection