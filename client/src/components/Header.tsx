import { useEffect } from "react";
import { LucideLoader2, LucideUser2 } from "lucide-react";
import { DataStore } from "../state/DataStore";

export default function Header() {
  const getUserData = DataStore((state) => state.getUserData);
  const UserData = DataStore((state) => state.UserData);
  const loading = DataStore((state) => state.loading);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="relative w-full h-[80px] flex justify-between items-center  gap-4 px-4 lg:px-16 lg:py-4 bg-[url(/bg.jpg)] bg-no-repeat  bg-cover overflow-hidden ">
      <div className="flex gap-4 items-center ">
        <span className="">
          <h1 className="text-4xl text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]">
            Social-Forum
          </h1>
          <p className="text-xs md:text-sm lg:text-md text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]">
            Student friendly social forum media.
          </p>
        </span>
      </div>
      {loading ? (
        <LucideLoader2 size="1rem" className="animate-spin" />
      ) : (
        UserData && (
          <span className="hidden md:flex items-center gap-2 text-white font-bold ">
            <p className="text-xs">{`${UserData.firstname.toUpperCase()}, ${UserData.lastname.toUpperCase()} (${
              UserData.studentID
            })`}</p>
            <LucideUser2 className="w-[30px] h-[30px] border rounded-full bg-yellow-500 text-white  border-white" />
          </span>
        )
      )}
    </div>
  );
}
