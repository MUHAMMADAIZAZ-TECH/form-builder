import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { CustomButton, InputField } from '../../components'
import { Field, Form, Formik } from 'formik'

const NewFormModal = ({ validationSchema, handleSubmit, onClose }) => {
  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <Box p={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography>New Form</Typography>
              </Grid>
              <Grid item xs={12}>
                <Field
                  fullWidth
                  label="Form Title"
                  as={InputField}
                  type="text"
                  name="title"
                  value={values.title}
                  sx={{ width: "100%" }}
                  handleChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
              </Grid>
              <Grid item xs={3.5}>
                <Box display='flex' justifyContent='space-between'>
                  <CustomButton
                    backgroundColor='#F1F5F9'
                    sx={{ color: '#94A3B8' }}
                    onClick={onClose}
                  >
                    Cancel
                  </CustomButton>
                  <CustomButton
                    type='submit'
                    backgroundColor='#0E6ACE'
                    sx={{ color: 'white' }}
                  >
                    Save
                  </CustomButton>
                </Box>
              </Grid>
              <Grid item xs={7.5} />
            </Grid>
          </Box>
        </Form>
      )}
    </Formik>

  )
}

export default NewFormModal