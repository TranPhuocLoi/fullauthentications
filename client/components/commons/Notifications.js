import React from 'react'
import {
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  errMsg: {
    background: "red",
    alignItems: "center",
    color: "#fff",
    padding: theme.spacing(2, 0),
  },
  successMsg: {
    background: "rgb(0, 255, 213)",
    alignItems: "center",
    color: "#fff",
    padding: theme.spacing(2, 0),
  },
}));

export const showErrMsg = msg => {
  const classes = useStyles();
  return <div className={classes.errMsg}>{msg}</div>
}

export const showSuccessMsg = msg => {
  const classes = useStyles();
  return <div className={classes.successMsg}>{msg}</div>
}