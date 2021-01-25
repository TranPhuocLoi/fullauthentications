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
// import { withTranslation } from "../i18n";
// import { compose } from "redux";
// import { connect } from "react-redux";
// import { loginUser } from "../stores/UserState";
// import { LOGIN_USER } from "../stores/UserState";

// const connectToRedux = connect(createStructuredSelector({}), (dispatch) => ({
//   doLoginUser: (user) => {
//     dispatch(loginUser(user));
//     dispatch({
//       type: LOGIN_USER,
//       payload: {
//         email: user.email,
//       },
//     });
//   },
// }));

// const enhance = compose(withTranslation("views"), connectToRedux);

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

const SignInComponent = ({ t, doLoginUser }) => {
  const classes = useStyles();
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;

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
          onSubmit={(event) => {
            event.preventDefault();
            doLoginUser(user);
          }}
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
            onChange={(event) => setEmail(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
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
