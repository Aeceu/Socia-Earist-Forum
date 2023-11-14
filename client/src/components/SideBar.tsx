import {
  LucideFeather,
  LucideHome,
  LucideMenu,
  LucideUser,
  LucideX,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { DataStore } from "../state/DataStore";
import { useEffect, useState } from "react";

export default function SideBar() {
  const params = useLocation();
  const [minimize, setMinimize] = useState(false);
  const UserData = DataStore((state) => state.UserData);
  const getUserData = DataStore((state) => state.getUserData);
  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <nav
      className={`${
        minimize ? "md:w-[80px]" : "md:w-[200px]"
      } w-full flex flex-row md:flex-col justify-between p-4  md:bg-gradient-to-b bg-gradient-to-l from-stone-100 to-red-500 via-red-200
      transition-all duration-300 text-white fixed md:relative bottom-0 z-50`}
    >
      <span
        className={`md:flex hidden text-red-500 mb-4  ${
          !minimize ? "justify-end" : "justify-center"
        }`}
      >
        {minimize ? (
          <LucideMenu
            onClick={() => setMinimize((prev) => !prev)}
            size={"1.5rem"}
            className="cursor-pointer hover:scale-125 transition-all duration-300"
          />
        ) : (
          <LucideX
            onClick={() => setMinimize((prev) => !prev)}
            size={"1.5rem"}
            className="cursor-pointer hover:animate-spin transition-all duration-500 "
          />
        )}
      </span>
      <ul className="h-full flex flex-row md:flex-col gap-4 text-sm">
        <Link
          to="/"
          className={`${minimize && "justify-center"} ${
            params.pathname === `/`
              ? " bg-red-500  shadow-red-900"
              : "bg-amber-500 shadow-yellow-900"
          } flex gap-2 items-center px-2 py-1.5  rounded-md shadow-inner  `}
        >
          <span>
            <LucideHome />
          </span>
          {!minimize && <h1 className="text-xs ">Home</h1>}
        </Link>
        <Link
          to={`/profile/${UserData?._id}`}
          className={`${minimize && "justify-center"} ${
            params.pathname === `/profile/${UserData?._id}`
              ? " bg-red-500  shadow-red-900"
              : "bg-amber-500 shadow-yellow-900"
          } flex gap-2 items-center px-2 py-1.5  rounded-md shadow-inner  `}
        >
          <span>
            <LucideUser />
          </span>
          {!minimize && <h1 className="text-xs ">Account</h1>}
        </Link>
        <Link
          to={`/createpost/${UserData?._id}`}
          className={`${minimize && "justify-center"} ${
            params.pathname === `/createpost/${UserData?._id}`
              ? " bg-red-500  shadow-red-900"
              : "bg-amber-500 shadow-yellow-900"
          }  flex gap-2 items-center px-2 py-1.5  rounded-full md:rounded-md shadow-inner  absolute right-5 bottom-20 w-[40px] h-[40px] md:w-auto md:h-auto md:relative md:right-auto md:bottom-auto`}
        >
          <span>
            <LucideFeather className="hover:scale-110 transition-all duration-300" />
          </span>
          {!minimize && <h1 className="text-xs">write-post</h1>}
        </Link>
      </ul>

      {/* Logout button */}
      <LogoutBtn minimize={minimize} />
    </nav>
  );
}
