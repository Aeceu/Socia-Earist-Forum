import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { LucideLoader2 } from "lucide-react";
import AuthStore from "../state/AuthStore";

const baseUrl = "http://localhost:4200";

export default function LoginForm() {
  const navigate = useNavigate();
  const setToken = AuthStore((state) => state.setToken);
  const setID = AuthStore((state) => state.setID);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    studentID: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/login`, { data });
      toast.success(res.data.message);
      setToken(res.data.token);
      setID(res.data.id);
      navigate("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
      setData({
        studentID: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto p-4  flex flex-col text-white gap-2 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100"
    >
      <h1 className="text-center text-4xl text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]">
        Login your account
      </h1>
      <span className="flex flex-col ">
        <label
          htmlFor="studentID"
          className="text-sm text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)] "
        >
          Student Number
        </label>
        <input
          value={data.studentID}
          onChange={(e) => setData({ ...data, studentID: e.target.value })}
          id="studentID"
          type="text"
          className="bg-inherit rounded-md px-1 py-1.5  border outline-none placeholder:text-white/70"
          placeholder="student number"
        />
      </span>
      <span className="flex flex-col ">
        <label
          htmlFor="email"
          className="text-sm text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)] "
        >
          Email
        </label>
        <input
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          id="email"
          type="text"
          className="bg-inherit rounded-md px-1 py-1.5  border outline-none placeholder:text-white/70"
          placeholder="email"
        />
      </span>
      <span className="flex flex-col ">
        <label
          htmlFor="password"
          className="text-sm text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]"
        >
          Password
        </label>
        <input
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          id="password"
          type="password"
          className="bg-inherit rounded-md px-1 py-1.5  border outline-none placeholder:text-white/70"
          placeholder="password"
        />
      </span>
      <button
        disabled={loading}
        type="submit"
        className="mt-4 bg-red-600 text-white flex gap-2 items-center justify-center px-2 py-1.5 text-sm border-2   rounded-md "
      >
        {loading ? (
          <span className="flex gap-2 items-center">
            <p>logging in</p>
            <LucideLoader2 size={"1rem"} className="animate-spin" />
          </span>
        ) : (
          "Log in"
        )}
      </button>
      <span className="w-full flex items-center gap-2">
        <p className="border-b w-full" />
        <p className="text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)]">
          or
        </p>
        <p className="border-b w-full" />
      </span>
      <Link
        to="/register"
        className="bg-red-600 text-white flex gap-2 items-center justify-center px-2 py-1.5 text-sm border-2  rounded-md "
      >
        Create an account
      </Link>
    </form>
  );
}
