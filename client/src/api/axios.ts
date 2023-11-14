import axios from "axios";

export default axios.create({
  baseURL: "https://social-earist-forum-backend.vercel.app",
  withCredentials: true,
});
