import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Link,
  makeStyles,
  Typography,
  Container,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState } from "react";

import { empLogin } from "../../services/ApiEmployeeServices/EmployeeServices";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EmployeeLogin = () => {
  const classes = useStyles();
  const history = useHistory();

  const [empLoginObj, setEmpLoginObj] = useState({
    empEmail: "",
    empPassword: "",
  });

  const handleChange = (e) => {
    e.persist();
    setEmpLoginObj((empLoginObj) => ({
      ...empLoginObj,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    empLogin(empLoginObj).then((res) => {
      if (!res.status) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong in login!",
          text: res.data.response.data,
        });
      } else {
        localStorage.setItem("user", JSON.stringify(res.data.data));
        history.push("/");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon style={{ fontSize: 40 }} />
        </Avatar>
        <Typography component="h2" variant="h5">
          Employee Login Portal
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="empEmail"
            name="empEmail"
            label="Email Address"
            autoComplete="off"
            autoFocus
            value={empLoginObj.empEmail}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="empPassword"
            label="Password"
            type="password"
            id="empPassword"
            autoComplete="current-password"
            value={empLoginObj.empPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>
        <Box mt={2}>
          <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://ishoppingplaza.herokuapp.com/">
              IShop Plaza
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
          </Typography>
        </Box>
      </div>
    </Container>
  );
};

export default EmployeeLogin;
