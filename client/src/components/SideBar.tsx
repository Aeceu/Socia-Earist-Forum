import { LucideHome, LucideMenu, LucideUser, LucideX } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import { DataStore } from "../state/DataStore";
import { useEffect, useState } from "react";

export default function SideBar() {
  const { id } = useParams();
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
      } w-full flex flex-row md:flex-col justify-between p-4   md:bg-gradient-to-b bg-gradient-to-l from-stone-100 to-red-500 via-red-200
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
            !id ? "border-2 border-black text-black " : "bg-red-500 "
          } flex gap-2 items-center px-2 py-1.5  rounded-md shadow-xl `}
        >
          <span>
            <LucideHome />
          </span>
          {!minimize && "Home"}
        </Link>
        <Link
          to={`/profile/${UserData?._id}`}
          className={`${minimize && "justify-center"} ${
            id === `${UserData?._id}`
              ? "border-2 border-black text-black "
              : "bg-red-500 "
          } flex gap-2 items-center px-2 py-1.5  rounded-md shadow-xl `}
        >
          <span>
            <LucideUser />
          </span>
          {!minimize && "Account"}
        </Link>
      </ul>

      {/* Logout button */}
      <LogoutBtn minimize={minimize} />
    </nav>
  );
}
