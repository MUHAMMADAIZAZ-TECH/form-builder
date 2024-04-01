import React, { useEffect, useState } from 'react'
import { CustomButton, CustomModal, PageContainer, PageHeader } from '../../components'
import { Box, Grid, IconButton, Tooltip, Typography, useMediaQuery } from '@mui/material';
import { Edit, PinIcon, BoxIcon, Delete } from '../../assets/icons/svgicons';
import FormFieldItem from './FormFieldItem';
import FormModal from './FormModal';
import { useOutletContext, useParams, useNavigate, Link } from 'react-router-dom';
import { CreateFields, CreateValue, FormGetByID, GetResponse, UpdateFields } from '../Apis';
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
const FormBuilder = ({ Response }) => {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const { id, responseID } = useParams()
    const navigate = useNavigate()
    const [handleSnackbarOpen] = useOutletContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [value, setValue] = useState('')
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [form, setForm] = useState(null);
    const [response, setResponse] = useState(null);

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
    const handleSubmit = () => {
        const body = {
            field: form?.form_fields[currentIndex].id,
            value: value,
            formID: responseID
        }
        CreateValue(
            body,
            handleSnackbarOpen,
            getResponse
        )
        setValue('')
    }
    const getResponse = () => {
        GetResponse(responseID, setResponse, handleSnackbarOpen)
    }
    useEffect(() => {
        FormGetByID(id, setForm, handleSnackbarOpen)
        responseID && getResponse()
    }, [id, responseID])

    const IsCompleted = form?.form_fields?.length > 0 && response?.values?.length &&
        form?.form_fields?.length === response?.values?.length;

    useEffect(() => {
        if (response?.values[currentIndex]) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    }, [currentIndex, response?.values,]);

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
                        width:'100%'
                    }}
                >
                    {Response === false && <Box>
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
                    </Box>}
                    <Grid container spacing={2}>

                        {!IsCompleted && form?.form_fields
                            ?.sort((a, b) => a.position - b.position)
                            .map((field, index) => (
                                (responseID && index === currentIndex) && (
                                    <Grid item xs={12} key={field.label}>
                                        <FormFieldItem
                                            field={field}
                                            index={index}
                                            handleOpen={handleOpenEdit}
                                            Response={Response}
                                            value={value}
                                            setValue={setValue}
                                        />
                                    </Grid>
                                )
                            ))}
                        {!responseID && form?.form_fields
                            ?.sort((a, b) => a.position - b.position)
                            .map((field, index) => (
                                <Grid item xs={12} key={field.label}>
                                    <FormFieldItem
                                        field={field}
                                        index={index}
                                        handleOpen={handleOpenEdit}
                                        Response={Response}
                                        value={value}
                                        setValue={setValue}
                                    />
                                </Grid>
                            ))}
                        {IsCompleted ===true && (
                            <Grid item xs={12}>
                                <Typography fontWeight={600} color='#2A4376' textAlign='center'>
                                    Successfully Submited Your Response! <Link to='/'>Go Back</Link></Typography>
                            </Grid>

                        )}
                        {Response === false && (
                            <Grid item xs={12}>
                                <CustomButton
                                    fullWidth
                                    sx={{ border: "2px dashed #0E6ACE" }}
                                    onClick={handleOpen}
                                >
                                    Add Field
                                </CustomButton>
                            </Grid>
                        )}
                        {Response === false && (
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
                                        Submit
                                    </CustomButton>
                                </Box>
                            </Grid>
                        )}
                        {!IsCompleted && Response === true && (
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
                                        onClick={handleSubmit}
                                    >
                                        Save and Next
                                    </CustomButton>
                                </Box>
                            </Grid>
                        )}
                    </Grid>
                </Box>
                <CustomModal open={open} onClose={handleClose} width={isSmallScreen ? '90%' : '50%'} maxHeight="100%">
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