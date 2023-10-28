import { useEffect } from "react";
import { LucideLoader2 } from "lucide-react";
import { DataStore } from "../state/DataStore";

export default function Header() {
  const getUserData = DataStore((state) => state.getUserData);
  const UserData = DataStore((state) => state.UserData);
  const loading = DataStore((state) => state.loading);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="w-full h-[80px] flex justify-between items-center  gap-4 px-4 lg:px-16 lg:py-4 bg-[url(/bg.jpg)] bg-no-repeat  bg-cover ">
      <div className="flex gap-4 items-center ">
        <img
          src="/earist-logo.png"
          width={60}
          height={60}
          alt="earist-logo"
          className="object-fill w-[40px] h-[40px] lg:w-[60px] lg:h-[60px]"
        />
        <span className="">
          <h1 className="text-lg md:text-2xl lg:text-4xl text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]">
            EARIST
          </h1>
          <p className="text-xs md:text-sm lg:text-md font-bold text-[rgb(177,1,1)] drop-shadow-[0px_1px_1px_rgba(250,204,21,.8)]">
            Eulogio Amang Rodriguez Institute of Science and Technology
          </p>
        </span>
      </div>
      {loading ? (
        <LucideLoader2 size="1rem" className="animate-spin" />
      ) : (
        UserData && (
          <span className="hidden md:flex items-center gap-2 text-black font-bold ">
            <p className="text-xs">{`${UserData.firstname.toUpperCase()}, ${UserData.lastname.toUpperCase()} (${
              UserData.studentID
            })`}</p>
          </span>
        )
      )}
    </div>
  );
}
