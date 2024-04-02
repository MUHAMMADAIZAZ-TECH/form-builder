import React, { useEffect, useState } from 'react'
import { CustomButton, PageContainer, PageHeader } from '../../components'
import { Box, Grid, IconButton, Tooltip } from '@mui/material';
import { Edit, PinIcon, BoxIcon, Delete } from '../../assets/icons/svgicons';
import FormFieldItem from '../FormBuilder/FormFieldItem';
import { useOutletContext, useParams, useNavigate } from 'react-router-dom';
import { FormGetByID, FormsGetResponseByID } from '../Apis';
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
    const { id, formId } = useParams()
    const navigate = useNavigate()
    const [handleSnackbarOpen] = useOutletContext();
    const [value, setValue] = useState('')
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
        },
    });

    useEffect(() => {
        FormsGetResponseByID(id, formId, setResponse, setForm, handleSnackbarOpen)
    }, [id, formId])
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
                        {response?.sort((a, b) => a.position - b.position)
                            .map((field, index) => {
                                return (
                                    <Grid item xs={12} key={field.label}>
                                        <FormFieldItem
                                            field={field}
                                            index={index}
                                            Response={field.response}
                                            value={field.type === 'checkbox' ? field?.value[0] : field?.value} // Set value if match is found, otherwise empty string
                                            setValue={setValue}
                                        />
                                    </Grid>
                                );
                            })}

                        <Grid item xs={12}>
                            <Box display='flex' justifyContent='flex-end'>
                                <CustomButton
                                    backgroundColor='#F1F5F9'
                                    sx={{ color: '#94A3B8' }}
                                    onClick={() => navigate(-1)}
                                >
                                    Cancel
                                </CustomButton>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </PageContainer>
        </>
    )
}

export default FormBuilder