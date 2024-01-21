import axios from "axios";

const localhost = "http://localhost:4200";
const deployed = "https://earist-forum.onrender.com";

export default axios.create({
  baseURL: deployed,
  withCredentials: true,
});
