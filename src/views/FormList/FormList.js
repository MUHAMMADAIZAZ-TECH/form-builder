import React, { useEffect, useState } from "react";
import { Box, InputAdornment } from "@mui/material";
import { CustomButton, CustomModal, InputField, PageContainer, PageHeader, Table } from "../../components/index";
import { Search } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewFormModal from "./NewFormModal";
import * as Yup from 'yup';
import { CreateForm, FormDeleteByID, FormsGetAll } from "../Apis";

const FormList = () => {
  const navigate = useNavigate()
  const [handleSnackbarOpen] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [Forms, setForms] = useState([]);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Form title is required')
      .max(25, 'Name must be at most 25 characters long')
  });
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleSubmit = (values) => {
    CreateForm(values,
      handleSnackbarOpen,
      Navigate
    )
  };
  const Navigate = (id) => {
    navigate(`/form-builder/${id}`)
    handleClose()
  }
  const handleOpenForm = (row) => {
    navigate(`/form-builder/${row.id}`)
  }
  const handleDeleteForm = async (row) => {
    try {
      await FormDeleteByID(row.id, handleSnackbarOpen)
      FormsGetAll(setForms, handleSnackbarOpen)
    } catch (error) {
      console.log(error);
    }
  }
  const handleView = (row,index) =>{
    console.log(row,index);
  }
  useEffect(() => {
    FormsGetAll(setForms, handleSnackbarOpen)
  }, [])
  return (
    <>
      <PageHeader label='eCRF' />
      <PageContainer maxWidth="xl">
        <Box width='100%' display='flex' justifyContent='space-between'>
          <InputField
            placeholder="Search"
            size="small"
            variant="outlined"
            sx={{ '& input': { padding: '6px 10px', lineHeight: 1 } }}
            InputLabelProps={{ sx: { lineHeight: '1' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
         <Box>
         <CustomButton backgroundColor="#0E6ACE" sx={{ color: 'white' }} onClick={handleOpen}> New Form</CustomButton>
         </Box>

        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Table
            showCheckBox={false}
            data={Forms.map((item) => ({ ...item, fields: item.form_fields.length, enableAsSurvey: 'Yes' })) || []}
            tableHeader={columns || []}
            handleOpen={handleOpenForm}
            showDeleteButton
            showUpdateButton
            onUpdate={handleOpenForm}
            onDelete={handleDeleteForm}
            onView={handleView}
          />
        </Box>
        <CustomModal open={open} onClose={handleClose} width='50%' maxHeight="100%">
          <NewFormModal validationSchema={validationSchema} handleSubmit={handleSubmit} onClose={handleClose} />
        </CustomModal>
      </PageContainer>
    </>
  );
};

export default FormList;

const columns = [
  { field: 'id', headerName: 'Forms', width: 100 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'fields', headerName: 'Sections / Fields', width: 200 },
  { field: 'enableAsSurvey', headerName: 'Enable As survey', width: 150, type: 'button' },
];
