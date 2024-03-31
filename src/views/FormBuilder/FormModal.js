import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CustomButton, CustomSwitch, InputField, SelectBox } from '../../components';
import { Close } from '@mui/icons-material';
import Tag from './Tag';

const FormModal = () => {
    const [Tab, setTab] = useState(null);

    const handleTab = (tab) => {
        setTab(tab);
    };

    return (
        <Box p={3}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>Add a Field</Typography>
                </Grid>
                <Grid item xs={4.4}>
                    <Box display='flex' justifyContent='space-between'>
                        <CustomButton
                            backgroundColor={Tab === null ? '#0E6ACE' : '#F1F5F9'}
                            sx={{ color: Tab === null ? 'white' : '#94A3B8' }}
                            onClick={() => handleTab(null)}
                        >
                            General
                        </CustomButton>
                        <CustomButton
                            backgroundColor={Tab === 1 ? '#0E6ACE' : '#F1F5F9'}
                            sx={{ color: Tab === 1 ? 'white' : '#94A3B8' }}
                            onClick={() => handleTab(1)}
                        >
                            Advance
                        </CustomButton>
                        <CustomButton
                            backgroundColor={Tab === 2 ? '#0E6ACE' : '#F1F5F9'}
                            sx={{ color: Tab === 2 ? 'white' : '#94A3B8' }}
                            onClick={() => handleTab(2)}
                        >
                            Validation
                        </CustomButton>
                    </Box>
                </Grid>
                <Grid item xs={7.6} />
                {Tab === null && (
                    <>
                        <Grid item xs={12}>
                            <SelectBox
                                options={['text', 'select', 'date', 'checkbox', 'radio']}
                                fullWidth
                                label="Choose a field"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                fullWidth
                                label="Field Label"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Variable Name"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box display='flex' margin={2}>
                                <Box>
                                    <CustomSwitch label='Required' />
                                </Box>
                                <Box ml={2}>
                                    <CustomSwitch label='Identifier' />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Tool Tip"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Helper Text"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Placeholder Text"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectBox
                                options={['text', 'select', 'date', 'checkbox', 'radio']}
                                fullWidth
                                label="Custom Alignment"
                            />
                        </Grid>
                    </>
                )}
                {Tab === 1 && (
                    <>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Add Options"
                            />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Box display="inline-block" color='white'>
                                <Tag label='Option 1' />
                            </Box>
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </>
                )}
                {Tab === 2 && (
                    <>
                        <Grid item xs={6}>
                            <SelectBox
                                options={['DD/MM/YYYY', 'YYYY/MM/DD']}
                                fullWidth
                                label="Choose Date Format"
                            />
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                            <Box display="inline-block" color='white' >
                                <Tag label='Option 1' />
                            </Box>
                        </Grid>
                        <Grid item xs={6}></Grid>
                    </>
                )}
                <Grid item xs={2.6}>
                    <Box display='flex' justifyContent='space-between'>
                        <CustomButton
                            backgroundColor='#F1F5F9'
                            sx={{ color: '#94A3B8' }}
                        >
                            Cancel
                        </CustomButton>
                        <CustomButton
                            backgroundColor='#0E6ACE'
                            sx={{ color: 'white' }}
                        >
                            Save
                        </CustomButton>
                    </Box>
                </Grid>
                <Grid item xs={9.4} />
            </Grid>
        </Box>
    )
}

export default FormModal;
