import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { paramCase } from 'change-case';
// @mui
import {
  Box,
  Card,
  Alert,
  Table,
  TableBody,
  Button,
  Switch,
  Tooltip,
  Stack,
  Grid,
  IconButton,
  Container,
  TableContainer,
  TablePagination,
  FormControlLabel,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { useSettingsContext } from 'src/components/settings';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { getProducts } from 'src/libs/api';

//
import ProductTableRow from '../product-table-row';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Product', align: 'left' },
  { id: 'price', label: 'Price', align: 'right' },
  { id: 'features', label: 'Features', align: 'left' },
];

// ----------------------------------------------------------------------

export default function ProductListView() {
  const settings = useSettingsContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState({});
  const [tableData, setTableData] = useState([]);
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
} = useTable({
    defaultOrderBy: 'createdAt',
});

  const fetchProducts = async () => {
    const products = await getProducts();
    // console.log("Products: ", products);
    setTableData(products);
  };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

  const handleGetProducts = () => {
    fetchProducts();
  };

  const denseHeight = dense ? 60 : 80;

  return (
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row">
                    <Box sx={{ m: 2 }}>
                        <Button
                            size="large"
                            variant="contained"
                            onClick={handleGetProducts}
                            // startIcon={<Iconify icon={'eva:refresh-fill'} />}
                        >
                            Get/Update Products from Stripe
                        </Button>
                        <Box sx={{ mt: 4 }}>
                            {message.msg && <Alert severity={message.severity}>{message.msg}</Alert>}
                        </Box>
                    </Box>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                {tableData && (
                    <Card>
                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 960, position: 'relative' }}>
                                {/* {selected.length > 0 && (
                                    <TableSelectedActions
                                        dense={dense}
                                        numSelected={selected.length}
                                        rowCount={tableData.length}
                                        onSelectAllRows={checked =>
                                            onSelectAllRows(
                                                checked,
                                                tableData.map(row => row.id)
                                            )
                                        }
                                        actions={
                                            <Tooltip title="Delete">
                                                <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                                                    <Iconify icon={'eva:trash-2-outline'} />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    />
                                )} */}

                                <Table size={dense ? 'small' : 'medium'}>
                                    <TableHeadCustom
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        rowCount={tableData.length}
                                        numSelected={selected.length}
                                        onSort={onSort}
                                        onSelectAllRows={checked =>
                                            onSelectAllRows(
                                                checked,
                                                tableData.map(row => row.id)
                                            )
                                        }
                                    />

                                    <TableBody>
                                        {tableData.map((row, index) => (
                                            <ProductTableRow
                                                key={row.id}
                                                row={row}
                                                // selected={selected.includes(row.id)}
                                                // onSelectRow={() => onSelectRow(row.id)}
                                                // onDeleteRow={() => handleDeleteRow(row.id)}
                                                // onEditRow={() => handleEditRow(row.name)}
                                            />
                                        ))}

                                        {/* <TableEmptyRows
                                            height={denseHeight}
                                            emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                                        /> */}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Scrollbar>

                        <Box sx={{ position: 'relative' }}>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={tableData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={onChangePage}
                                onRowsPerPageChange={onChangeRowsPerPage}
                            />

                            <FormControlLabel
                                control={<Switch checked={dense} onChange={onChangeDense} />}
                                label="Dense"
                                sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
                            />
                        </Box>
                    </Card>
                )}
            </Grid>
            </Grid>
      </Container>
  );
}