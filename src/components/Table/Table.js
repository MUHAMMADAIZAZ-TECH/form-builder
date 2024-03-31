import React, { useState, useEffect, useCallback } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  Paper,
  Tooltip,
  TablePagination,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { AddBox, Delete, Edit, Download, Info } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { InputField, SelectBox } from "../InputFields/CustomInput";
import { CustomButton } from "../Buttons/Buttons";

const CustomTableCell = styled(TableCell)({
  lineHeight: 1,
  padding: 12,
  cursor: "pointer",
});

export const CustomToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '48px !important',
  paddingLeft: '12px !important',
  paddingRight: '12px !important',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
  },
}));
const CustomTable = ({
  data,
  tableHeader,
  onRowSelect,
  handleCloseModal,
  showCheckBox = true,
  showAddButton = false,
  showDeleteButton = false,
  showUpdateButton = false,
  onAdd,
  onDelete,
  onUpdate,
  addTooltip,
  onCheckboxChange,
  showDownloadButton = false,
  onDownload,
  stickyheader,
  onView,
  pagination = false,
  ViewTooltip,
  rowsPerPageOptions,
  label,
  toolbar,
  searchinput,
  maxHeight,
  minHeight,
  setDisable,
  action,
  handleOpen
}) => {
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions ? rowsPerPageOptions[0] : 5);
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const onSelectTableCell = useCallback((row) => {
    if (onRowSelect) {
      const newSelectedRow = selectedRow === row ? null : row;
      onRowSelect(newSelectedRow);
      setSelectedRow(newSelectedRow);
      handleCloseModal && handleCloseModal();
    }
  }, [onRowSelect]);

  const handleChange = (e, index) => {
    const newData = [...tableData];
    const row = newData[index];
    if (!Object.prototype.hasOwnProperty.call(row, e.target.name)) {
      row[e.target.name] = e.target.value;
    } else {
      row[e.target.name] = e.target.value;
    }
    setTableData(newData);
  };
  const handleChangeCheckbox = (e, index) => {
    const newData = [...tableData];
    const row = newData[index];
    if (!Object.prototype.hasOwnProperty.call(row, e.target.name)) {
      row[e.target.name] = e.target.checked;
    } else {
      row[e.target.name] = e.target.checked;
    }
    setTableData(newData);
    setDisable && setDisable(false)
  };
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = filterValue ? tableData.filter(row =>
    Object.values(row).some(value =>
      String(value).toLowerCase().includes(filterValue.toLowerCase())
    )
  ) : tableData;

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const Data = data.length > 0 ? (pagination) ? paginatedData : tableData : [];

  return (
    <Paper>
      {toolbar && (
        <CustomToolbar>
          <Box width='100%' display='flex' justifyContent='space-between'>
            {searchinput && (
              <InputField
                label="Search"
                size="small"
                variant="outlined"
                value={filterValue}
                onChange={handleFilterChange}
                sx={{ '& input': { padding: '6px 10px', lineHeight: 1 } }}
                InputLabelProps={{ sx: { lineHeight: '1' } }}
              />
            )}
            <CustomButton backgroundColor="#0E6ACE" sx={{ color: 'white' }}> New Form</CustomButton>
          </Box>
        </CustomToolbar>
      )}
      <TableContainer sx={{ width: "100%", maxHeight, minHeight, borderRadius: 1.5 }}>
        <Table stickyHeader={stickyheader}>
          <TableHead sx={{ backgroundColor: "#0E6ACE", }}>
            <TableRow>
              {showCheckBox && <CustomTableCell></CustomTableCell>}
              {tableHeader.map((column) => (
                <CustomTableCell key={column.field} sx={{ color: 'white' }}>
                  {column.headerName}
                </CustomTableCell>
              ))}
              {!action && <CustomTableCell></CustomTableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: '#F1F5F9' }} >
                {tableHeader.map((column) => (
                  <CustomTableCell key={column.field} component="th" scope="row" onClick={() => handleOpen(row)}>
                    {column.type === "input" ? (
                      <SelectBox
                        name={column.field}
                        value={row[column.field]}
                        options={[]}
                        sx={{ width: '100%' }}
                        onChange={(e) => handleChange(e, index)}
                        fullWidth
                      />
                    ) : column.type === "button" ? (
                      <CustomButton
                        sx={{ border: '2px solid #F59E0B', color: 'black' }}
                        backgroundColor='#FEF3C7'
                      >{row[column.field]}
                      </CustomButton>
                    ) : (
                      row[column.field]
                    )}
                  </CustomTableCell>
                ))}
                {!action && <CustomTableCell>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                  >
                    {showAddButton && (
                      <Tooltip title={addTooltip || "Add"}>
                        <IconButton size="small" onClick={() => onAdd(row, index)}>
                          <AddBox fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {showUpdateButton && (
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => onUpdate(row, index)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {showDeleteButton && (
                      <Tooltip title="Remove">
                        <IconButton
                          size="small"
                          onClick={() => onDelete(row, index)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {showDownloadButton && (
                      <Tooltip title="Download">
                        <IconButton
                          size="small"
                          onClick={() => onDownload(row, index)}
                        >
                          <Download fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onView && (
                      <Tooltip title={ViewTooltip || "View Detail"}>
                        <IconButton
                          size="small"
                          onClick={() => onView(row, index)}
                        >
                          <Info fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Stack>
                </CustomTableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {pagination && (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions ? rowsPerPageOptions : [5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
};

export default CustomTable;
