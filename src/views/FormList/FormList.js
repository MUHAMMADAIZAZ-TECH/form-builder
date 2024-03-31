import React from "react";
import { Box, Grid, InputAdornment, Paper } from "@mui/material";
import { CustomButton, InputField, PageContainer, PageHeader, Table } from "../../components/index";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const columns = [
  { field: 'id', headerName: 'Forms', width: 100 },
  { field: 'name', headerName: 'Sections/Fields', width: 200 },
  { field: 'enableAsSurvey', headerName: 'Enable As survey', width: 150 },
  { field: 'formActions', headerName: 'Form Actions', width: 200 },
];

const rows = [
  { id: 1, name: 'Section 1', enableAsSurvey: 'Yes', formActions: 'Edit / Delete' },
  { id: 2, name: 'Section 2', enableAsSurvey: 'No', formActions: 'Edit / Delete' },
  { id: 3, name: 'Section 3', enableAsSurvey: 'Yes', formActions: 'Edit / Delete' },
];

const CodesList = () => {
  const navigate = useNavigate()
  const handleNewFrom = () => {
    navigate('/form-builder')
  }
  return (
    <>
      <PageHeader label='eCRF' />
      <PageContainer maxWidth="xl">
        <Box width='100%' display='flex' justifyContent='space-between'>
          <InputField
            label="Search"
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
          <CustomButton backgroundColor="#0E6ACE" sx={{ color: 'white' }} onClick={handleNewFrom}> New Form</CustomButton>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Table
            showCheckBox={false}
            data={rows || []}
            tableHeader={columns || []}
          />
        </Box>
      </PageContainer>
    </>
  );
};

export default CodesList;
