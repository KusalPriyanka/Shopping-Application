import axios from "axios";

export const registerUserApiService = (registerUserObj) => {
  const formData = new FormData();
  formData.append("photo", registerUserObj.userImage.raw);
  formData.set("username", registerUserObj.userName);
  formData.set("address", registerUserObj.userAddress);
  formData.set("email", registerUserObj.userEmail);
  formData.set("mobile", registerUserObj.userMobileNo);
  formData.set("password", registerUserObj.userPassword);

  return axios
    .post("https://ishoppingplaza.herokuapp.com/api/users/register", formData)
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
  return axios
    .post("https://ishoppingplaza.herokuapp.com/api/users/login", loginUserObj)
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
