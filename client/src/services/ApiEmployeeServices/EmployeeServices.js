import axios from "axios";

export const empLogin = (empObj) => {
  const apiURL =
    process.env.apiURL || "http://localhost:8080/" + "api/EmployeeLogin/";

  return axios
    .post(apiURL, empObj)
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
