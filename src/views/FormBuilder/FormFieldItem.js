import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { PinIcon, BoxIcon, Delete, Edit } from '../../assets/icons/svgicons'
import TypeSelection from './TypeSelection'

const FormFieldItem = ({ field }) => {
    const [value, setValue] = useState('')
    console.log(field);
    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleCheckboxChange = (label, isChecked) => {
        if (isChecked) {
            setValue(label);
        } else {
            setValue('');
        }
    };

    const handleRadioChange = (value) => {
        setValue(value);
    };

    console.log(value);
    return (
        <Box pt={2} pb={2} pl={3} pr={3} sx={{ backgroundColor: '#E2E8F0', borderRadius: 2 }}>
            <Box display='flex' mb={2}>
                <PinIcon />
                <BoxIcon />
                <Delete />
                <Edit />
                <Box
                    bgcolor='white'
                    borderRadius={4}
                    height={16}
                    pl='5px'
                    pr='5px'
                    mt='2px'
                    ml='8px'
                >
                    <Typography
                        color='#2A4376'
                        fontWeight={600}
                        fontSize={10}>
                        var: {field?.label}
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Typography color='#2A4376' fontWeight={600} fontSize={16} lineHeight='19.6px'>
                    {field?.position} . {field?.label}
                </Typography>
            </Box>
            <TypeSelection
                value={value}
                handleChange={handleChange}
                field={field}
                handleCheckboxChange={handleCheckboxChange}
                handleRadioChange={handleRadioChange}
            />
        </Box>
    )
}

export default FormFieldItem