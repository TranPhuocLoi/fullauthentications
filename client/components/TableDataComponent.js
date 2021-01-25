import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import { DeleteOutline, Edit } from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, name, phone, permission, action) {
  return { id, name, phone, permission, action };
}

const rows = [
  createData(1, "Nudo", "0988019663", "admin", 1),
  createData(2, "Nudo", "0988019663", "admin", 1),
  createData(3, "Nudo", "0988019663", "admin", 1),
  createData(4, "Nudo", "0988019663", "admin", 1),
  createData(5, "Nudo", "0988019663", "admin", 1),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TableDataComponent() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Phone</StyledTableCell>
            <StyledTableCell align="right">Permission</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.phone}</StyledTableCell>
              <StyledTableCell align="right">{row.permission}</StyledTableCell>
              <StyledTableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<Edit />}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteOutline />}
                >
                  Delete
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
