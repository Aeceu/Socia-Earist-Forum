import axios from "axios";

export default axios.create({
  baseURL: "https://socia-earist-forum-backend.vercel.app",
  withCredentials: true,
});
