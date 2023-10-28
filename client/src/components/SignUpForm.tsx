import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { LucideLoader2 } from "lucide-react";

const baseUrl = "http://localhost:4200";

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    studentID: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const router = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/register`, { data });
      toast.success(res.data.message);
      router("/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.error);
      console.log(error.response.data.error);
    } finally {
      setLoading(false);
      setData({
        studentID: "",
        firstname: "",
        lastname: "",
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
        Register an account
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
          placeholder="Student Number"
        />
      </span>
      <div className="w-full flex flex-col gap-2 md:flex-row ">
        <span className="w-full  flex flex-col ">
          <label
            htmlFor="firstname"
            className="text-sm text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)] "
          >
            Firstname
          </label>
          <input
            value={data.firstname}
            onChange={(e) => setData({ ...data, firstname: e.target.value })}
            id="firsntname"
            type="text"
            className="bg-inherit rounded-md px-1 py-1.5  border outline-none placeholder:text-white/70"
            placeholder="Firstname"
          />
        </span>
        <span className="w-full  flex flex-col ">
          <label
            htmlFor="lastname"
            className="text-sm text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)] "
          >
            Lastname
          </label>
          <input
            value={data.lastname}
            onChange={(e) => setData({ ...data, lastname: e.target.value })}
            id="lastname"
            type="text"
            className="bg-inherit rounded-md px-1 py-1.5  border outline-none placeholder:text-white/70"
            placeholder="Lastname"
          />
        </span>
      </div>

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
      <Link
        to="/login"
        className="w-max text-yellow-400 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(177,1,1,.8)] text-sm text-end hover:underline"
      >
        {"Already have an account?"}
      </Link>
      <button
        disabled={loading}
        type="submit"
        className="mt-4 bg-red-600 text-white flex gap-2 items-center justify-center px-2 py-1.5 text-sm border-2   rounded-md "
      >
        {loading ? (
          <span className="flex gap-2 items-center">
            <p>Signing Up</p>
            <LucideLoader2 size={"1rem"} className="animate-spin" />
          </span>
        ) : (
          "Sign Up "
        )}
      </button>
    </form>
  );
}
