import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthStore from "../state/AuthStore";
import { LucideLoader2, LucideLogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutBtn({ minimize }: { minimize: boolean }) {
  const navigate = useNavigate();
  const setToken = AuthStore((state) => state.setToken);
  const setID = AuthStore((state) => state.setID);
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      const baseUrl = "https://socia-earist-forum-backend.vercel.app";
      await axios.get(`${baseUrl}/logout`);
      setID("");
      setToken("");
      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleLogout}
      type="button"
      className={`${
        minimize && "justify-center"
      } flex gap-2 items-center px-2 py-1.5 text-sm border-2 text-white bg-red-500 rounded-md border-yellow-300
      hover:bg-yellow-300 hover:text-red-500 hover:border-red-500 `}
    >
      {loading ? (
        <span className="flex gap-2 items-center justify-center w-full">
          {/* {!minimize && "Logging-out"} */}
          <LucideLoader2 size={"1rem"} className="animate-spin" />
        </span>
      ) : (
        <span className="flex items-center gap-2 w-full justify-center">
          {!minimize && "Logout"}
          <LucideLogOut />
        </span>
      )}
    </button>
  );
}
