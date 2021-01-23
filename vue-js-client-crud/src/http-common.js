import axios from "axios";

export default axios.create({
  baseURL: "http://clube-do-robson.herokuapp.com:5000/api",
  headers: {
    "Content-type": "application/json"
  }
});
