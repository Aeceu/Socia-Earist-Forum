import { useNavigate, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataStore } from "../state/DataStore";
import { Badge } from "../components/ui/badge";
import {
  LucideChevronLeftCircle,
  LucideContact2,
  LucideLoader2,
  LucideMoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import axios from "axios";
import toast from "react-hot-toast";
import EditProfile from "../components/EditProfile";
import { categories } from "../lib/categories";
import PostCard from "../components/PostCard";

type DataDetails = {
  _id: string;
  studentID: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
};

type PostDetails = {
  _id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  creator: DataDetails;
  likes: [string];
};

export default function Profile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const user = DataStore((state) => state.user);
  const getUser = DataStore((state) => state.getUser);
  const UserPosts = DataStore((state) => state.UserPosts);
  const getUserPosts = DataStore((state) => state.getUserPosts);
  const UserData = DataStore((state) => state.UserData);
  const [category, setCategory] = useState("");
  const [fillteredData, setFillteredData] = useState<PostDetails[] | null>(
    null
  );
  useEffect(() => {
    if (id) {
      getUser(id);
      getUserPosts(id);
    }
  }, [getUser, getUserPosts, id]);

  useEffect(() => {
    if (UserPosts) {
      setFillteredData(UserPosts?.filter((post) => post.category === category));
    }
  }, [UserPosts, category]);

  const baseUrl = "https://socia-earist-forum-backend.vercel.app";

  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${baseUrl}/user/${user?._id}`);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full border-b px-4 py-4 flex flex-col">
        {UserData?._id === user?._id && (
          <div className="absolute right-3 top-3 z-50">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LucideMoreVertical size={"1rem"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-red-500">
                <EditProfile />
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-red-500 font-bold cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      Deleting
                      <LucideLoader2 className="animate-spin" size="1rem" />
                    </span>
                  ) : (
                    "Delete account"
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <span className="flex items-center gap-2">
          <Link to={"/"}>
            <LucideChevronLeftCircle className="text-red-500 hover:text-yellow-300 hover:scale-125 transition-all duration-300" />
          </Link>
          <LucideContact2
            size={"2rem"}
            className="text-red-500 drop-shadow-[0px_1px_1px_rgba(250,204,21,.8)]"
          />
          <h1 className="text-2xl font-bold text-red-500 drop-shadow-[0px_1px_1px_rgba(250,204,21,.8)]">{`${user?.firstname.toUpperCase()} ${user?.lastname.toUpperCase()}`}</h1>
        </span>
        <span className="flex flex-col gap-2 justify-center items-start py-4">
          <span className="flex gap-2 items-center">
            <p className="text-sm font-bold text-red-500 ">Student number: </p>
            <Badge className="font-bold text-[10px]">{user?.studentID}</Badge>
          </span>
          <span className="flex gap-2 items-center">
            <p className="text-sm font-bold text-red-500 ">School email:</p>
            <Badge className="font-bold text-[10px]">{user?.email}</Badge>
          </span>
        </span>
      </div>
      <div className="w-full p-4 flex items-center gap-2 border-y overflow-y-hidden overflow-x-scroll scroll-design">
        <Badge
          onClick={() => setCategory("")}
          className={`cursor-pointer ${
            !category && "bg-white border-red-500 text-red-500"
          }`}
        >
          All
        </Badge>
        {categories.map((cat, i) => (
          <Badge
            key={i}
            onClick={() => setCategory(cat.name)}
            className={`cursor-pointer ${
              category === cat.name && "bg-white border-red-500 text-red-500"
            }`}
          >
            {cat.name}
          </Badge>
        ))}
      </div>
      <div className="w-full max-h-screen  overflow-y-scroll flex flex-col">
        {!category ? (
          UserPosts &&
          UserPosts.map((post, i) => (
            <PostCard key={i} data={post} setCategory={setCategory} />
          ))
        ) : fillteredData && fillteredData?.length > 0 ? (
          fillteredData.map((post, i) => (
            <PostCard key={i} data={post} setCategory={setCategory} />
          ))
        ) : (
          <h1 className="text-sm text-red-500 p-4">Empty...</h1>
        )}
      </div>
    </div>
  );
}
