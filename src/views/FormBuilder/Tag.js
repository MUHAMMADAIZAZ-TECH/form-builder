import React from 'react'
import { Close } from '@mui/icons-material'
import { Typography } from '@mui/material'

const Tag = ({ label, onClose }) => {
    return (
        <Typography
            sx={{ borderRadius: 5, bgcolor: '#0E6ACE', fontSize: 13 }} pl={1} pr={1} pt={0.5} pb={0.5} m={'2px'}
        >{label}
            <Close fontSize='10px' sx={{ cursor: 'pointer' }} onClick={onClose} />
        </Typography>
    )
}

export default Tag