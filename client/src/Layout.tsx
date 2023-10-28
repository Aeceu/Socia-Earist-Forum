import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex md:h-[calc(100vh-80px)] h-full md:flex-row flex-col-reverse">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}
