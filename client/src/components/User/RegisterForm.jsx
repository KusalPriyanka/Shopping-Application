import React, { useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import imgSignUp from './signup_cover.jpg';
import userImg from './user.png';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${imgSignUp})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
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
}));

const RegisterForm = () => {

  const classes = useStyles();

  const [userImage, setuserImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setuserImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  return(
    <Grid container component="main" className={classes.root}>
    <CssBaseline />
    <Grid item xs={false} sm={4} md={7} className={classes.image} />
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register to IShop Plaza
        </Typography>
        <Avatar alt="user photo" src={userImage.preview ? userImage.preview : userImg} className={classes.large} />
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            type="text"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userAddress"
            label="User Address"
            name="userAddress"
            autoComplete="userAddress"
            type="text"
          />          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label="User Email Address"
            name="userEmail"
            autoComplete="userEmail"
            type="text"
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
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userMobileNo"
            label="User Mobile No"
            name="userMobileNo"
            autoComplete="userMobileNo"
            type="text"
          />
          <input
            accept="image/*"
            className={classes.imgUpload}
            id="userImg"
            name="userImg"
            multiple
            fullWidth
            type="file"
            onChange={handleChange}
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
}

export default RegisterForm;
