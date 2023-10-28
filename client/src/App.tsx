import { Route, Routes } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import Home from "./pages/Home";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ProtectedRoutes, PublicRoutes } from "./lib/ProtectedRoutes";

const App = () => {
  axios.defaults.baseURL = "http://localhost:4200";
  axios.defaults.withCredentials = true;
  return (
    <Routes>
      {/* private routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
      </Route>
      {/* public routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default App;
