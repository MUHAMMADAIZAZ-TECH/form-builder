import React, { useEffect, useState } from "react";
import { Box, InputAdornment } from "@mui/material";
import { CustomModal, InputField, PageContainer, PageHeader, Table } from "../../components/index";
import { Search } from "@mui/icons-material";
import { useNavigate, useOutletContext } from "react-router-dom";
import NewFormModal from "./NewFormModal";
import * as Yup from 'yup';
import { CreateForm, FormsGetAllResponses } from "../Apis";

const FormList = () => {
  const navigate = useNavigate()
  const [handleSnackbarOpen] = useOutletContext();
  const [open, setOpen] = useState(false);
  const [Forms, setForms] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Form title is required')
      .max(25, 'Name must be at most 25 characters long')
  });
  const handleClose = () => {
    setOpen(false)
  }
  const handleSubmit = (values) => {
    CreateForm(values,
      handleSnackbarOpen,
      Navigate
    )
  };
  const Navigate = (id) => {
    navigate(`/form-builder/${id}`)
    handleClose();
  }
  const handleView = (row) => {
    navigate(`/form-builder/submited-response/${row.id}/form/${row.form}`)
  }
 
  useEffect(() => {
    FormsGetAllResponses(setForms, handleSnackbarOpen)
  }, [])

  // Filtered forms based on the search input value
  const filteredForms = Forms?.filter(form =>
    form.form.toLowerCase().includes(searchValue.toLowerCase())
  );

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
            // Update search value on change
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Table
            showCheckBox={false}
            data={filteredForms || []}
            tableHeader={columns || []}
            onView={handleView}
            ViewTooltip='View Response'
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
  { field: 'id', headerName: 'S#no', width: 100 },
  { field: 'form', headerName: 'Form', width: 200 },
  { field: 'status', headerName: 'Status', width: 200 },
];
