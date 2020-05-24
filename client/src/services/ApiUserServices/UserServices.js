import axios from "axios";

export const registerUserApiService = (registerUserObj) => {
  const apiURL =
    process.env.apiURL || "http://localhost:8080/" + "api/users/register";

  const formData = new FormData();
  formData.append("photo", registerUserObj.userImage.raw);
  formData.set("username", registerUserObj.userName);
  formData.set("address", registerUserObj.userAddress);
  formData.set("email", registerUserObj.userEmail);
  formData.set("mobile", registerUserObj.userMobileNo);
  formData.set("password", registerUserObj.userPassword);

  return axios
    .post(apiURL, formData)
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

export const loginUserApiService = (loginUserObj) => {
  const apiURL =
    process.env.apiURL || "http://localhost:8080/" + "api/users/login";

  return axios
    .post(apiURL, loginUserObj)
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
