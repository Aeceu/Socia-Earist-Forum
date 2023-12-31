import { useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import {
  LucideEye,
  LucideEyeOff,
  LucideLoader2,
  LucideMail,
  LucideUserCircle2,
} from "lucide-react";
import AuthStore from "../state/AuthStore";

export default function LoginForm() {
  const [show, setShow] = useState(false);
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
      const res = await axios.post(`/login`, { data });
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
      className="z-50 w-max   p-4  flex flex-col gap-2 rounded-md shadow-2xl border bg-white "
    >
      <h1 className="text-center text-4xl font-bold text-[rgb(177,1,1)] drop-shadow-[3px_3px_0px_rgba(250,204,21,.8)]">
        Login your account
      </h1>
      <span className="flex flex-col ">
        <label
          htmlFor="studentID"
          className="text-sm font-bold text-red-600
          "
        >
          Student Number
        </label>
        <span className="bg-inherit rounded-md px-1 py-1.5 border shadow-inner outline-none flex items-center justify-between">
          <input
            value={data.studentID}
            onChange={(e) => setData({ ...data, studentID: e.target.value })}
            id="studentID"
            type="text"
            className="w-full outline-none placeholder:text-[14px]"
            placeholder="student number"
          />
          <LucideUserCircle2 size={"1.3rem"} />
        </span>
      </span>
      <span className="flex flex-col ">
        <label htmlFor="email" className="text-sm font-bold text-red-600  ">
          Email
        </label>
        <span className="bg-inherit rounded-md px-1 py-1.5 border shadow-inner outline-none flex items-center justify-between">
          <input
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            id="email"
            type="text"
            className="w-full outline-none placeholder:text-[14px]"
            placeholder="email"
          />
          <LucideMail size={"1.3rem"} />
        </span>
      </span>
      <span className="flex flex-col ">
        <label htmlFor="password" className="text-sm font-bold text-red-600 ">
          Password
        </label>
        <span className="flex items-center justify-between bg-inherit rounded-md px-1 py-1.5 border shadow-inner outline-none">
          <input
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            id="password"
            type={show ? "text" : "password"}
            className="outline-none w-full placeholder:text-[14px]"
            placeholder="password"
          />
          {show ? (
            <LucideEye
              size={"1.3rem"}
              className="hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          ) : (
            <LucideEyeOff
              size={"1.3rem"}
              className="hover:scale-110 transition-all duration-300 cursor-pointer"
              onClick={() => setShow((prev) => !prev)}
            />
          )}
        </span>
      </span>
      <button
        disabled={loading}
        type="submit"
        className="font-bold mt-4 bg-red-600 shadow-inner shadow-red-900 text-white flex gap-2 items-center justify-center px-2 py-1.5 text-sm border-2   rounded-md "
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
        <p className="text-[rgb(177,1,1)] drop-shadow-[0px_1px_1px_rgba(250,204,21,.8)] font-bold">
          or
        </p>
        <p className="border-b w-full" />
      </span>
      <Link
        to="/register"
        className="font-bold  bg-red-600 shadow-inner shadow-red-900 text-white flex gap-2 items-center justify-center px-2 py-1.5 text-sm border-2  rounded-md "
      >
        Create an account
      </Link>
    </form>
  );
}
