import axios from "axios";

// const localhost = "http://localhost:4200";
const deployed = "https://social-earist-forum-backend.vercel.app";

export default axios.create({
  baseURL: deployed,
  withCredentials: true,
});
