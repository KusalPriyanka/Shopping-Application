import axios from "axios";

if (localStorage.getItem("user")) {
  axios.defaults.headers.common["auth-token"] = JSON.parse(
    localStorage.getItem("user")
  ).userToken;
}

export const getFeedbacks = (productId) => {
  const apiURL =
    process.env.apiURL || "http://localhost:8080/api/feedback/" + productId;

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
  const apiURL = process.env.apiURL || "http://localhost:8080/api/feedback/add";

  return axios
    .post(apiURL, feedback)
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
  const apiURL =
    process.env.apiURL || "http://localhost:8080/api/feedback/edit";

  return axios
    .put(apiURL, feedback)
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
  const apiURL =
    process.env.apiURL || "http://localhost:8080/api/feedback/delete";

  return axios
    .delete(apiURL, { data: feedback })
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
