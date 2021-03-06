import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  CssBaseline,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Grid,
  Link,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";

import { showErrMsg, showSuccessMsg } from "../commons/Notifications"

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2, 0),
  },
}));

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};


const SignInComponent = () => {
  const classes = useStyles();
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;

  const handleChangeInput = e => {
    const { name, value } = e.target
    console.log({ email });
    setUser({ ...user, [name]: value, err: '', success: "" })
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/login', { email, password })
      console.log(res);

    } catch (err) {
      err.response.data.msg && setUser({ ...user, err: err.response.data.msg, success: "" })
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleChangeInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangeInput}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignInComponent;
