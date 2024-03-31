import React, { useEffect, useState } from 'react'
import { CustomButton, CustomModal, PageContainer, PageHeader } from '../../components'
import { Box, Grid } from '@mui/material';
import { Edit, PinIcon, BoxIcon, Delete } from '../../assets/icons/svgicons';
import FormFieldItem from './FormFieldItem';
import FormModal from './FormModal';
import { useOutletContext, useParams ,useNavigate} from 'react-router-dom';
import { CreateFields, FormGetByID } from '../Apis';

const FormBuilder = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [handleSnackbarOpen] = useOutletContext();
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState(false);
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleCreateField = (body) => {
        CreateFields(body, handleSnackbarOpen, ReloadOnAdd)
    }
    const FetchForm = () => {
        FormGetByID(id, setForm, handleSnackbarOpen)
    }
    const ReloadOnAdd = () => {
        FetchForm()
        handleClose()
    }
    const handleSave = () =>{
        navigate('/')
    }
    useEffect(() => {
        FormGetByID(id, setForm, handleSnackbarOpen)
    }, [id])
    return (
        <>
            <PageHeader label={form?.title} />
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

                        {form?.form_fields?.length > 0 && (
                            form.form_fields?.map((field) => (
                                <Grid item xs={12} key={field.label}>
                                    <FormFieldItem field={field} />
                                </Grid>
                            ))
                        )}

                        <Grid item xs={12}>
                            <CustomButton
                                fullWidth
                                sx={{ border: "2px dashed #0E6ACE" }}
                                onClick={handleOpen}
                            >
                                Add Field
                            </CustomButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display='flex' justifyContent='flex-end'>
                                <CustomButton
                                    backgroundColor='#F1F5F9'
                                    sx={{ color: '#94A3B8' }}
                                    onClick={handleSave}
                                >
                                    Cancel
                                </CustomButton>
                                <CustomButton
                                    type='submit'
                                    backgroundColor='#0E6ACE'
                                    sx={{ color: 'white' ,ml:2}}
                                    onClick={handleSave}
                                >
                                    Save
                                </CustomButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <CustomModal open={open} onClose={handleClose} width='50%' maxHeight="100%">
                    <FormModal formId={id} position={form?.form_fields?.length + 1} CreateFields={handleCreateField} />
                </CustomModal>
            </PageContainer>
        </>
    )
}

export default FormBuilder