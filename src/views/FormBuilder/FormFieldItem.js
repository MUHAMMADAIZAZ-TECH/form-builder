import React, { useState } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { PinIcon, BoxIcon, Delete, Edit } from '../../assets/icons/svgicons'
import TypeSelection from './TypeSelection'
import { FieldDeleteByID } from '../Apis'

const FormFieldItem = ({ field, disable, handleOpen, Response,value,setValue }) => {
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
    const handleDeleteField = () => {
        FieldDeleteByID(field.id)
    };
    const handleUpdateField = () => {
        handleOpen(field, true)
    };
    return (
        <Box pt={2} pb={2} pl={3} pr={3} sx={{ backgroundColor: '#E2E8F0', borderRadius: 2 }}>
            {Response ===false && <Box display='flex' mb={2}>
                <Tooltip title="Pin">
                    <IconButton
                        size="small"
                    >
                        <PinIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Copy">
                    <IconButton
                        size="small"
                    >
                        <BoxIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                    <IconButton
                        size="small"
                        onClick={handleUpdateField}
                    >
                        <Edit />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove">
                    <IconButton
                        size="small"
                        onClick={handleDeleteField}
                    >
                        <Delete />
                    </IconButton>
                </Tooltip>
                <Box
                    bgcolor='white'
                    borderRadius={4}
                    height={16}
                    pl='5px'
                    pr='5px'
                    mt='8px'
                    ml='8px'
                >
                    <Typography
                        color='#2A4376'
                        fontWeight={600}
                        fontSize={10}

                    >
                        var: {field?.label}
                    </Typography>
                </Box>
            </Box>}
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
                disable={disable}
            />
        </Box>
    )
}

export default FormFieldItem