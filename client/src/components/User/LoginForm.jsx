import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import imgSignIn from "./signin_cover.jpg";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { loginUserApiService } from "../../services/ApiUserServices/UserServices";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${imgSignIn})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loginUserObj, setLoginUserObj] = useState({
    email: "",
    password: "",
  });

  const [progressStatus, setProgressStatus] = useState(false);

  const handleChange = (e) => {
    e.persist();
    setLoginUserObj((loginUserObj) => ({
      ...loginUserObj,
      [e.target.name]: e.target.value,
    }));
  };

  const onSignInUser = async (e) => {
    e.preventDefault();
    setProgressStatus(true);

    if (validateUserInputs()) {
      await loginUserApiService(loginUserObj).then((res) => {
        if (!res.status) {
          Swal.fire({
            icon: "error",
            title: "Something went wrong in login !",
            text: res.data.response.data,
          });
        } else {
          localStorage.setItem("user", JSON.stringify(res.data.data));
          history.push("/");
        }
      });
    }

    setProgressStatus(false);
  };

  const validateUserInputs = () => {
    if (loginUserObj.email === "") {
      showValidationError("Please enter user email !");
      return false;
    }
    if (loginUserObj.password === "") {
      showValidationError("Please enter user password !");
      return false;
    }
    return true;
  };

  const showValidationError = (errMsg) => {
    return Swal.fire({
      icon: "error",
      title: "Something went wrong in login!",
      text: errMsg,
    });
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Backdrop className={classes.backdrop} open={progressStatus}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in to IShop Plaza
          </Typography>

          <form onSubmit={onSignInUser} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
              onChange={handleChange}
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
              onChange={handleChange}
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
            <Link
              to="/register"
              variant="body2"
              style={{ textDecoration: "none" }}
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoginForm;
