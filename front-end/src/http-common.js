import axios from "axios";

export default axios.create({
  baseURL: "https://clube-do-robson.herokuapp.com:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});
