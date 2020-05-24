import axios from "axios";

if (localStorage.getItem("user")) {
  axios.defaults.headers.common["auth-token"] = JSON.parse(
    localStorage.getItem("user")
  ).userToken;
}

export const getFeedbacks = (productId) => {
  const apiURL = "api/feedback/" + productId;

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
    .post("api/feedback/add", feedback)
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
    .put("api/feedback/edit", feedback)
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
    .delete("api/feedback/delete", { data: feedback })
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
