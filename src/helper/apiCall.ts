import axios from "axios";

const apiCall = axios.create({
  baseURL: "https://gorest.co.in/public/v2/users",
  headers: {
    Authorization:
      "Bearer 719f868e30dd964defacfb84e84beff6b09e23389c7203ad28bc301acdc1a3ac",
  },
});

export default apiCall;
