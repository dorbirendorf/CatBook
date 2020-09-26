import axios from "axios";

const BASE_URL = "http://localhost:5000/";

const calculateAge = (birthday) => {
  // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const register = (userInfo) => {
  const { firstName, lastName, email, password } = userInfo;
  const user = {
    name: `${firstName} ${lastName}`,
    email,
    password,
  };
  return axios.post(`${BASE_URL}users`, user);
};

const login = (user) => {
  return axios.post(`${BASE_URL}users/login`, user).then((res) => {
    if (res.data.token) {
      localStorage.setItem("user", JSON.stringify(res.data));
    }
    return res.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export { login, logout, register, calculateAge, getCurrentUser };
