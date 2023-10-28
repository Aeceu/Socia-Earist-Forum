import { Outlet, Navigate } from "react-router-dom";
import AuthStore from "../state/AuthStore";

export default function Auth() {
  const tokenID = AuthStore((state) => state.tokenID);
  return tokenID;
}

export const ProtectedRoutes = () => {
  const isAuth = Auth(); // Use your Auth component or state management here

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export const PublicRoutes = () => {
  const isAuth = Auth(); // Use your Auth component or state management here

  return isAuth ? <Navigate to="/" /> : <Outlet />;
};
