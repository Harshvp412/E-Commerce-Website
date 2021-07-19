import Axios from 'axios';
// const URL =
// process.env.NODE_ENV === "development"
// : "https://esummitiitm.com/api";

// const URL = "https://esummitiitm.org/api";
const URL = 'http://localhost:5500/api';
const axios = Axios.create({
  baseURL: URL,
  withCredentials: true,
});

export default axios;
