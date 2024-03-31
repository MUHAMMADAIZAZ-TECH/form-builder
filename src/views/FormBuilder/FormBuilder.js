import React, { useEffect, useState } from 'react'
import { CustomButton, CustomModal, PageContainer, PageHeader } from '../../components'
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { Edit, PinIcon, BoxIcon, Delete } from '../../assets/icons/svgicons';
import FormFieldItem from './FormFieldItem';
import FormModal from './FormModal';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { CreateFields, FormGetByID, UpdateFields } from '../Apis';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    type: '',
    label: '',
    variableName: '',
    required: false,
    identifier: false,
    toolTip: '',
    helperText: '',
    placeholderText: '',
    customAlignment: '',
    options: [],
    chooseDateFormat: '',
};
const FormBuilder = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [handleSnackbarOpen] = useOutletContext();
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState(false);

    const validationSchema = Yup.object().shape({
        type: Yup.string().required('Field Type is required'),
        label: Yup.string().required('Field Label is required'),
        variableName: Yup.string(),
        required: Yup.string(),
        helperText: Yup.string(),
        placeholderText: Yup.string(),
        customAlignment: Yup.string(),
        optionsText: Yup.string(),
        chooseDateFormat: Yup.string(),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            if (edit) {
                const Body = {
                    "label": values.label,
                    "type": values.type,
                    "position": values.position,
                    "required": values.required,
                    "dependent_on_fields": [],
                    "options": values.options,
                    "condition": "",
                    "condition_value": "",
                    "form": id
                }
                UpdateFields({ ...Body, id: values.id }, handleSnackbarOpen, ReloadOnAdd)
            }
            else {
                const Body = {
                    "label": values.label,
                    "type": values.type,
                    "position": form?.form_fields?.length + 1,
                    "required": values.required,
                    "dependent_on_fields": [],
                    "options": values.options,
                    "condition": "",
                    "condition_value": "",
                    "form": id
                }
                handleCreateField(Body)

            }
        },
    });
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    const handleOpenEdit = (field, edit) => {
        setEdit(true)
        setOpen(true)
        formik.setValues(field)
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
    const handleSave = () => {
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
                            >
                                <Delete />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                            <IconButton
                                size="small"
                            >
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Grid container spacing={2}>

                        {form?.form_fields
                            ?.sort((a, b) => a.position - b.position) // Sort the form_fields array based on the position
                            .map((field, index) => (
                                <Grid item xs={12} key={field.label}>
                                    <FormFieldItem field={field} index={index} handleOpen={handleOpenEdit} />
                                </Grid>
                            ))}

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
                                    sx={{ color: 'white', ml: 2 }}
                                    onClick={handleSave}
                                >
                                    Save
                                </CustomButton>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <CustomModal open={open} onClose={handleClose} width='50%' maxHeight="100%">
                    <FormModal
                        formId={id}
                        position={form?.form_fields?.length + 1}
                        CreateFields={handleCreateField}
                        formik={formik}
                        label={edit ? 'Edit Field' : 'Add a Field'} 
                    />
                </CustomModal>
            </PageContainer>
        </>
    )
}

export default FormBuilder