import React, { useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { CustomButton, CustomSwitch, InputField, SelectBox } from '../../components';
import Tag from './Tag';
import { Formik, Form, Field, useFormik } from 'formik';
import * as Yup from 'yup';
import { useOutletContext } from 'react-router-dom';

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

const FormModal = ({ formId, position, CreateFields }) => {

    const [Tab, setTab] = useState(null);
    const [handleSnackbarOpen] = useOutletContext();

    const handleTab = (tab) => {
        setTab(tab);
    };
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
            const Body = {
                "label": values.label,
                "type": values.type,
                "position": position,
                "required": values.required,
                "dependent_on_fields": [],
                "options": values.options,
                "condition": "",
                "condition_value": "",
                "form": formId
            }
            console.log(values);
            CreateFields(Body)
        },
    });
    const { values, setValues, touched, errors, handleBlur, handleChange } = formik;
    console.log(values);
    const handleClose = (opindex) => {
        const UpdatedOptions = [...values.options].filter((_, index) => index !== opindex)
        setValues((prev) => ({
            ...prev,
            options: UpdatedOptions
        }))
    }
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
                                type="text"
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.type && Boolean(errors.type)}
                                helperText={touched.type && errors.type}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <InputField
                                fullWidth
                                label="Field Label"
                                multiline
                                rows={3}
                                type="text"
                                name="label"
                                value={values.label}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.label && Boolean(errors.label)}
                                helperText={touched.label && errors.label}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Variable Name"
                                type="text"
                                name="variableName"
                                value={values.variableName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.variableName && Boolean(errors.variableName)}
                                helperText={touched.variableName && errors.variableName}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box display='flex' margin={2}>
                                <Box>
                                    <CustomSwitch
                                        label='Required'
                                        name="required"
                                        value={values.required}
                                        onChange={handleChange}
                                    />
                                </Box>
                                <Box ml={2}>
                                    <CustomSwitch
                                        label='Identifier'
                                        name="identifier"
                                        value={values.identifier}
                                        onChange={handleChange}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Tool Tip"
                                type="text"
                                name="toolTip"
                                value={values.toolTip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.toolTip && Boolean(errors.toolTip)}
                                helperText={touched.toolTip && errors.toolTip}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Helper Text"
                                type="text"
                                name="helperText"
                                value={values.helperText}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.helperText && Boolean(errors.helperText)}
                                helperText={touched.helperText && errors.helperText}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputField
                                fullWidth
                                label="Placeholder Text"
                                type="text"
                                name="placeholderText"
                                value={values.placeholderText}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.placeholderText && Boolean(errors.placeholderText)}
                                helperText={touched.placeholderText && errors.placeholderText}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <SelectBox
                                options={['left', 'right', 'center']}
                                fullWidth
                                label="Custom Alignment"
                                type="text"
                                name="customAlignment"
                                value={values.customAlignment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.customAlignment && Boolean(errors.customAlignment)}
                                helperText={touched.customAlignment && errors.customAlignment}
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
                                type="text"
                                name="optionsText"
                                value={values.optionsText}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault(); // Prevent form submission
                                        const newOption = values.optionsText;
                                        setValues((prev) => ({
                                            ...prev,
                                            options: [...values.options, newOption]
                                        }))
                                    }
                                }}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.optionsText && Boolean(errors.optionsText)}
                                helperText={touched.optionsText && errors.optionsText}
                            />
                        </Grid>

                        <Grid item xs={6}></Grid>
                        <Grid item xs={12}>
                            <Box display="flex" color='white' overflow='auto' flexWrap='wrap'>
                                {values && values?.options?.map((item, index) =>
                                    <Tag label={item} onClose={() => handleClose(index)} />)}
                            </Box>
                        </Grid>
                    </>
                )}
                {Tab === 2 && (
                    <>
                        <Grid item xs={6}>
                            <SelectBox
                                options={['DD/MM/YYYY', 'YYYY/MM/DD']}
                                fullWidth
                                label="Choose Date Format"
                                type="text"
                                name="chooseDateFormat"
                                value={values.chooseDateFormat}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.chooseDateFormat && Boolean(errors.chooseDateFormat)}
                                helperText={touched.chooseDateFormat && errors.chooseDateFormat}
                            />
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
                            onClick={formik.handleSubmit}
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
