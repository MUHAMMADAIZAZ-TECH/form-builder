import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Typography, Box, Paper } from '@mui/material';
import { Dashboard, AddHome, Camera, Album } from '@mui/icons-material';
import { observer } from 'mobx-react-lite';

const iconComponents = {
    Dashboard: Dashboard,
    AddHome: AddHome,
    Camera: Camera,
    Album: Album
};
function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${props.timeRemaining}s`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export const CircularWithValueLabel = observer(({ code }) => {
    const progress = (60 - code.timeLeft) / 60 * 100;
    const IconComponent = iconComponents[code.icon];
    return (
        <Paper sx={{ padding: 1, backgroundColor: '#EAEAEA' }} elevation={2}>
            <Box display='flex' justifyContent='space-between'>
                {IconComponent && <IconComponent sx={{ fontSize: 40 }} htmlColor="#1976d2" />}
                <Box>
                    <Typography fontSize={12} color='GrayText' fontStyle={'italic'}>{code.name}</Typography>
                    <Typography fontSize={18} fontWeight={600} color='GrayText'>{code.code}</Typography>
                </Box>
                <CircularProgressWithLabel value={progress} timeRemaining={code.timeLeft} />
            </Box>
        </Paper>
    );
})
