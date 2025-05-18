import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const CustomTable = ({ 
  columns,       // array objek: { id, label, align = "left" }
  rows,          // array data objek
  onEdit,        // function(row) saat klik edit
  onDelete,      // function(row) saat klik delete
  limit          // optional: batasi row tampil
}) => {
  return (
    <TableContainer>
      <Table size="small" aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map(({ id, label, align = "left" }) => (
              <TableCell key={id} align={align}>
                {label}
              </TableCell>
            ))}
            {(onEdit || onDelete) && <TableCell align="right" />}
          </TableRow>
        </TableHead>

        <TableBody>
          {(limit ? rows.slice(0, limit) : rows).map((row) => (
            <TableRow hover key={row.id}>
              {columns.map(({ id, align = "left" }) => (
                <TableCell key={id} align={align}>
                  {row[id]}
                </TableCell>
              ))}

              {(onEdit || onDelete) && (
                <TableCell align="right">
                  {onEdit && (
                    <Tooltip title="Edit Information" arrow>
                      <IconButton
                        aria-label="edit"
                        color="warning"
                        size="small"
                        sx={{ fontSize: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(row);
                        }}
                      >
                        <ModeEditOutlineOutlinedIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  )}

                  {onDelete && (
                    <Tooltip title="Delete Record" arrow>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        sx={{ fontSize: 2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(row);
                        }}
                      >
                        <DeleteOutlineOutlinedIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
