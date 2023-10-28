import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { DataStore } from "../state/DataStore";
import { useState, useEffect } from "react";

import { LucideLoader2 } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export default function EditProfile() {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const user = DataStore((state) => state.user);
  const getUser = DataStore((state) => state.getUser);

  const [data, setData] = useState({
    studentID: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setData({
        studentID: user?.studentID,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
      });
    }
  }, [user]);

  const baseUrl = "https://socia-earist-forum-backend.vercel.app";

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await axios.patch(`${baseUrl}/user/${user?._id}`, { data });
      toast.success(res.data.message);
      if (user) getUser(user?._id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setToggle(false);
      setData({
        studentID: "",
        firstname: "",
        lastname: "",
        email: "",
      });
    }
  };

  return (
    <Dialog open={toggle}>
      <DialogTrigger
        onClick={() => setToggle(true)}
        className="text-emerald-500 font-bold cursor-pointer p-2 text-sm hover:bg-muted-foreground/20 w-full flex rounded-md hover:text-black"
      >
        Edit
      </DialogTrigger>
      <DialogContent className=" p-4 bg-black/20 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 border border-red-500 ">
        <DialogHeader>
          <DialogTitle className="flex justify-center gap-2">
            <h1 className="text-center text-3xl text-red-500 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(250,204,21,.8)]">
              Edit your account
            </h1>
          </DialogTitle>
          <DialogDescription className=" flex flex-col gap-2">
            <span className="flex flex-col gap-1 ">
              <label
                htmlFor="studentID"
                className="text-sm text-black font-bold "
              >
                Student Number
              </label>
              <input
                value={data.studentID}
                onChange={(e) =>
                  setData({ ...data, studentID: e.target.value })
                }
                id="studentID"
                type="text"
                className="bg-inherit rounded-md px-1 py-1.5  border border-red-500 outline-none text-black "
                placeholder="Student Number"
              />
            </span>
            <div className="flex gap-2 ">
              <span className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="firstname"
                  className="text-sm text-black font-bold "
                >
                  Firstname
                </label>
                <input
                  value={data.firstname}
                  onChange={(e) =>
                    setData({ ...data, firstname: e.target.value })
                  }
                  id="firsntname"
                  type="text"
                  className="bg-inherit rounded-md px-1 py-1.5  border border-red-500 outline-none text-black"
                  placeholder="Firstname"
                />
              </span>
              <span className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="lastname"
                  className="text-sm text-black font-bold "
                >
                  Lastname
                </label>
                <input
                  value={data.lastname}
                  onChange={(e) =>
                    setData({ ...data, lastname: e.target.value })
                  }
                  id="lastname"
                  type="text"
                  className="w-full bg-inherit rounded-md px-1 py-1.5  border border-red-500 outline-none text-black"
                  placeholder="Lastname"
                />
              </span>
            </div>
            <span className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-black font-bold ">
                Email
              </label>
              <input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                id="email"
                type="text"
                className="bg-inherit rounded-md px-1 py-1.5  border border-red-500 outline-none text-black"
                placeholder="email"
              />
            </span>
          </DialogDescription>
          <DialogDescription className="w-full flex justify-between gap-2 text-sm p-2 font-bold">
            <span className="w-full flex gap-2 items-center justify-end ">
              <button
                onClick={() => setToggle(false)}
                type="button"
                className="text-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                type="button"
                className="text-emerald-500"
              >
                {loading ? (
                  <LucideLoader2 size="1rem" className="animate-spin" />
                ) : (
                  "Update"
                )}
              </button>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
