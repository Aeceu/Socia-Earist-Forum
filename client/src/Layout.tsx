import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import SearchTab from "./components/SearchTab";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex h-[calc(100vh-80px)]  md:flex-row flex-col-reverse">
        <SideBar />
        <Outlet />
        <SearchTab />
      </div>
    </div>
  );
}
