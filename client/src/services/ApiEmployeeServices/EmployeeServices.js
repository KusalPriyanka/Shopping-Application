import axios from "axios";

export const empLogin = (empObj) => {
  return axios
    .post("https://ishoppingplaza.herokuapp.com/api/EmployeeLogin/", empObj)
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
