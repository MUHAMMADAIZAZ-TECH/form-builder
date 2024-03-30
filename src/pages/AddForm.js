import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import { CustomButton, InputField, PageContainer, PageHeader, SelectBox } from '../components';
import codeStore from '../store/Store';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useOutletContext } from 'react-router-dom';

const AddCodePage = () => {
  const [handleSnackbarOpen] = useOutletContext();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .max(15, 'Name must be at most 15 characters long')
  });
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    codeStore.addCode(values);
    handleSnackbarOpen('success','New code added successfully!')
    navigate(-1);
  };
  return (
    <Paper elevation={2}>
      <PageHeader label='Add New Code' />
      <PageContainer>
        <Formik
          initialValues={{ name: '', icon: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    as={InputField}
                    label="Name"
                    value={values.name}
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    type="text"
                    name="icon"
                    placeholder="Select icon"
                    as={SelectBox}
                    label="Icon"
                    value={values.icon}
                    options={['Dashboard', 'AddHome', 'Camera', 'Album']}
                    sx={{ width: "100%" }}
                    handleChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.icon && Boolean(errors.icon)}
                    helperText={touched.icon && errors.icon}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomButton
                    type="submit"
                    fullWidth
                    variant='contained'
                  >
                    Add
                  </CustomButton>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </PageContainer>
    </Paper>
  );
};

export default AddCodePage;
