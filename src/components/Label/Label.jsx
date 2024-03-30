import React from 'react'
import { Box, Typography } from '@mui/material';

export const PageHeader = ({ label }) => {
    return (
        <Box sx={{
            borderBottom: '2px solid #eaeaf2',
            paddingX: 2,
            paddingY: 1.5,
        }}>
            <Typography
                sx={{ fontSize: 16, fontWeight: 600 }}
                color="text.secondary"
                gutterBottom
            >
                {label}
            </Typography>
        </Box>
    )
}
