import React from 'react'
import { Box, Typography } from '@mui/material';

export const PageHeader = ({ label }) => {
    return (
        <Box sx={{
            paddingY: 1.5,
        }}>
            <Typography
                sx={{ fontSize: 16, fontWeight: 600 }}
                gutterBottom
            >
                {label}
            </Typography>
        </Box>
    )
}
