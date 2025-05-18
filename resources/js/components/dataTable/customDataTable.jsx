import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, TableSortLabel, Paper
} from '@mui/material';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const CustomDataTable = ({ rows, headCells, renderRow }) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(headCells[0]?.id || '');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle sorting only for rows without isHari (header rows)
  const sortableRows = rows.filter(row => !row.isHari);
  const headerRows = rows.filter(row => row.isHari);

  // Sorted & paginated data rows (excluding hari header)
  const sortedRows = stableSort(sortableRows, getComparator(order, orderBy));
  const paginatedRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  // Now we merge headerRows and paginatedRows respecting their original order,
  // but since pagination only on normal rows, hari headers stay in original order and visible on page

  // For simplicity, assume headerRows appear before their groups
  // We'll interleave header rows with paginated rows by matching hari values
  // This requires the rows have hari field for grouping

  // Group paginated rows by hari
  const grouped = paginatedRows.reduce((acc, row) => {
    if (!acc[row.hari]) acc[row.hari] = [];
    acc[row.hari].push(row);
    return acc;
  }, {});

  // Final rows to render, hari header + group rows
  const rowsToRender = [];
  headerRows.forEach(hariRow => {
    const hari = hariRow.hari;
    if (grouped[hari]) {
      rowsToRender.push(hariRow);
      grouped[hari].forEach(r => rowsToRender.push(r));
      delete grouped[hari];
    }
  });

  // In case some hari have no header or rows (unlikely)
  Object.values(grouped).forEach(groupRows => {
    groupRows.forEach(r => rowsToRender.push(r));
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headCells.map(headCell => (
                <TableCell
                  key={headCell.id}
                  sortDirection={orderBy === headCell.id ? order : false}
                  align={headCell.align || 'left'}
                >
                  {!headCell.disableSorting ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={e => handleRequestSort(e, headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rowsToRender.map((row, i) => renderRow(row, i))}
            {rowsToRender.length === 0 && (
              <TableRow>
                <TableCell colSpan={headCells.length} align="center">
                  No data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={sortableRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomDataTable;
