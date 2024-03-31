import React, { useState } from 'react'
import { CustomButton, CustomCheckbox, CustomModal, CustomSwitch, IOSSwitch, InputField, PageContainer, PageHeader, SelectBox } from '../../components'
import { Box, Grid, Typography } from '@mui/material';
import { Edit, PinIcon, BoxIcon, Delete } from '../../assets/icons/svgicons';
import FormFieldItem from './FormFieldItem';
import FormModal from './FormModal';

const FormBuilder = () => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return (
        <>
            <PageHeader label='eCRF' />
            <PageContainer maxWidth="xl">
                <Box
                    sx={{
                        bgcolor: '#F1F5F9',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        minWidth: 300,
                    }}
                >
                    <Box>
                        <PinIcon />
                        <BoxIcon />
                        <Delete />
                        <Edit />
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormFieldItem />
                        </Grid>
                        <Grid item xs={12}>
                            <CustomButton
                                fullWidth
                                sx={{ border: "2px dashed #0E6ACE" }}
                                onClick={handleOpen}
                            >
                                Add Field
                            </CustomButton>
                        </Grid>
                    </Grid>
                </Box>
                <CustomModal open={open} onClose={handleClose} width='50%' maxHeight="100%">
                    <FormModal />
                </CustomModal>
            </PageContainer>
        </>
    )
}

export default FormBuilder