import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  form: {
    margin: "15px auto",
  },
  formItem: {
    marginBottom: theme.spacing(1),
  },
  buttonAddUser: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddUserComponent() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography>Add new user</Typography>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          className={classes.formItem}
          fullWidth
          id="standard-basic"
          label="Type user name"
        />
        <TextField
          className={classes.formItem}
          fullWidth
          id="standard-basic"
          label="Type phone nummber"
        />
        <FormControl fullWidth className={classes.formItem}>
          <InputLabel id="demo-simple-select-label">
            Choose user permission
          </InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
          >
            <MenuItem>Ten</MenuItem>
            <MenuItem>Twenty</MenuItem>
            <MenuItem>Thirty</MenuItem>
          </Select>
        </FormControl>
        <Button
          fullWidth
          className={classes.buttonAddUser}
          variant="contained"
          color="secondary"
        >
          Add new
        </Button>
      </form>
    </Box>
  );
}
