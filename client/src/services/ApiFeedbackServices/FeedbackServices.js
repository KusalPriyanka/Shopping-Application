import axios from "axios";

export const getFeedbacks = (productId) => {
  const apiURL =
    "https://ishoppingplaza.herokuapp.com/api/feedback/" + productId;

  return axios
    .get(apiURL)
    .then((res) => {
      return {
        status: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        status: false,
        data: err,
      };
    });
};

export const addFeedback = (feedback) => {
  return axios
    .post("https://ishoppingplaza.herokuapp.com/api/feedback/add", feedback)
    .then((res) => {
      return {
        status: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        status: false,
        data: err,
      };
    });
};

export const editFeedback = (feedback) => {
  return axios
    .put("https://ishoppingplaza.herokuapp.com/api/feedback/edit", feedback)
    .then((res) => {
      return {
        status: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        status: false,
        data: err,
      };
    });
};

export const deleteFeedback = (feedback) => {
  return axios
    .delete("https://ishoppingplaza.herokuapp.com/api/feedback/delete", {
      data: feedback,
    })
    .then((res) => {
      return {
        status: true,
        data: res,
      };
    })
    .catch((err) => {
      return {
        status: false,
        data: err,
      };
    });
};
