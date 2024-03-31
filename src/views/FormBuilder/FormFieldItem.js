import React from 'react'
import { Box, Typography } from '@mui/material'
import { PinIcon, BoxIcon, Delete, Edit } from '../../assets/icons/svgicons'
import { InputField } from '../../components'

const FormFieldItem = () => {
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
                        var: _name
                    </Typography>
                </Box>
            </Box>
            <Box>
                <Typography color='#2A4376' fontWeight={600} fontSize={16} lineHeight='19.6px'>1. What is your name?</Typography>
            </Box>
            <Box mt={2}>
                <InputField
                />
            </Box>
        </Box>
    )
}

export default FormFieldItem