import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import imgSignUp from "./signup_cover.jpg";
import userImg from "./user.png";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import { registerUserApiService } from "../../services/ApiUserServices/UserServices";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${imgSignUp})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  imgUpload: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginTop: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const RegisterForm = () => {
  const classes = useStyles();

  const [regUserObj, setRegUserObj] = useState({
    userName: "",
    userAddress: "",
    userEmail: "",
    userMobileNo: "",
    userPassword: "",
    userImage: {
      preview: "",
      raw: "",
    },
  });

  const [progressStatus, setProgressStatus] = useState(false);
  const history = useHistory();

  const handleChangeFile = (e) => {
    if (e.target.files.length) {
      const userImgObj = {
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      };
      setRegUserObj({ ...regUserObj, userImage: userImgObj });
    }
  };

  const handleChange = (e) => {
    e.persist();
    setRegUserObj((regUserObj) => ({
      ...regUserObj,
      [e.target.name]: e.target.value,
    }));
  };

  const onRegisterUser = async (e) => {
    e.preventDefault();
    setProgressStatus(true);

    await registerUserApiService(regUserObj).then((res) => {
      if (!res.status) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong in registration!",
          text: res.data.response.data,
        });
      } else {
        Swal.fire({
          title: "Sucessfully Registered!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Sign In Now",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.value) {
            history.push("/login");
          }
        });
      }
    });

    setProgressStatus(false);
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
          <Typography component="h1" variant="h5">
            Register to IShop Plaza
          </Typography>
          <Avatar
            alt="user photo"
            src={
              regUserObj.userImage.preview
                ? regUserObj.userImage.preview
                : userImg
            }
            className={classes.large}
          />
          <form onSubmit={onRegisterUser} className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="off"
              type="text"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userAddress"
              label="User Address"
              name="userAddress"
              autoComplete="off"
              type="text"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userEmail"
              label="User Email Address"
              name="userEmail"
              autoComplete="off"
              type="text"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="userPassword"
              label="User Password"
              type="password"
              id="userPassword"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="userMobileNo"
              label="User Mobile No"
              name="userMobileNo"
              autoComplete="off"
              type="text"
              onChange={handleChange}
            />
            <input
              accept="image/*"
              className={classes.imgUpload}
              id="userImg"
              name="userImg"
              multiple
              type="file"
              onChange={handleChangeFile}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register Now
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default RegisterForm;
