import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import face from "./ui.jpg";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import blueGrey from "@material-ui/core/colors/blueGrey";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import Icon from "@material-ui/core/Icon";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";

import {
  getFeedbacks,
  editFeedback,
  deleteFeedback,
  addFeedback,
} from "../../services/ApiFeedbackServices/FeedbackServices";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "95%",
    backgroundColor: blueGrey[50],
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    padding: theme.spacing(0),
  },
  inline: {
    display: "inline",
  },
  active: {
    backgroundColor: blue[100],
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "80%",
  },
  button: {
    margin: theme.spacing(1),
  },
  ratingBar: {
    margin: theme.spacing(1),
  },
}));

const Feedback = (props) => {
  const classes = useStyles();

  const { productId } = props;
  const history = useHistory();

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackStatus, setFeedbackStatus] = useState(false);
  const [formStatus, setFormStatus] = useState("ADD");
  const [formChange, setFormChange] = useState(Date.now());
  const [feedback, setFeedback] = useState({
    _id: "",
    feedback: "",
    rating: 0,
  });

  useEffect(() => {
    getFeedbacks(productId).then((res) => {
      if (!res.status) {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: res.data.response.data,
        }).then((result) => {
          if (result.value) {
            if (res.data.response.status === 401) history.push("/login");
          }
        });
        return;
      }
      const ownFeedbackIndex = res.data.data.findIndex(
        (feed) => feed.editableMode
      );
      if (ownFeedbackIndex !== -1) setFeedbackStatus(false);
      else setFeedbackStatus(true);
      setFeedbacks(res.data.data);
    });
  }, [formChange]);

  const addorEditFeedback = () => {
    if (formStatus === "ADD") {
      const reqObj = {
        productId: productId,
        feedback: feedback.feedback,
        rating: feedback.rating,
      };
      addFeedback(reqObj).then((res) => {
        if (res.data.status === 200) {
          Swal.fire(
            "Sucessfully Added Feedback!",
            "Thank you for your valuable feedback!",
            "success"
          );
          setFormChange(Date.now());
        } else {
          // Error Part Handle
        }
      });
    } else if (formStatus === "EDIT") {
      const reqObj = {
        feedbackId: feedback._id,
        feedback: feedback.feedback,
        rating: feedback.rating,
      };
      editFeedback(reqObj).then((res) => {
        if (res.data.status === 200) {
          setFormChange(Date.now());
        } else {
          // Error Part Handle
        }
      });
    }
  };

  const handleChange = (e) => {
    e.persist();
    setFeedback((feedback) => ({
      ...feedback,
      [e.target.name]: e.target.value,
    }));
  };

  const editMyFeedback = (feedback) => {
    const index = feedbacks.findIndex((feed) => feed._id === feedback._id);
    feedbacks.splice(index, 1);
    setFeedback(feedback);
    setFormStatus("EDIT");
    setFeedbackStatus(true);
  };

  const deleteMyFeedback = (feedback) => {
    const reqObj = {
      feedbackId: feedback._id,
    };

    deleteFeedback(reqObj).then((res) => {
      if (res.data.status === 200) {
        setFormChange(Date.now());
      } else {
        // Error Part Handle
      }
    });
  };

  const myFeedBack = () => {
    return (
      <ListItem alignItems="flex-start" className={classes.active}>
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={JSON.parse(localStorage.getItem("user")).userImage}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <TextField
              id="standard-full-width"
              label={JSON.parse(localStorage.getItem("user")).userName}
              style={{ margin: 5 }}
              placeholder="Enter FeedBack Here"
              className={classes.textField}
              margin="normal"
              value={feedback.feedback}
              InputLabelProps={{
                shrink: true,
              }}
              name="feedback"
              onChange={handleChange}
            />
          }
          secondary={
            <Rating
              name="rating"
              value={feedback.rating}
              className={classes.ratingBar}
              onChange={handleChange}
            />
          }
        />
        <ListItemSecondaryAction>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={addorEditFeedback}
            endIcon={<Icon>send</Icon>}
          >
            Post
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  return (
    <Grid container justify="center">
      <List className={classes.root}>
        {feedbackStatus ? myFeedBack() : null}
        {feedbacks.map((feed) => (
          <ListItem alignItems="flex-start" key={feed.userName}>
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={feed.img ? feed.img : face} />
            </ListItemAvatar>
            <ListItemText
              primary={feed.feedback}
              secondary={
                <Rating name="simple-controlled" value={feed.rating} readOnly />
              }
            />
            <ListItemSecondaryAction hidden={!feed.editableMode}>
              <IconButton>
                <EditIcon
                  color="primary"
                  onClick={() => editMyFeedback(feed)}
                />
              </IconButton>
              <IconButton>
                <DeleteIcon
                  style={{ color: red[500] }}
                  onClick={() => deleteMyFeedback(feed)}
                />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default Feedback;
