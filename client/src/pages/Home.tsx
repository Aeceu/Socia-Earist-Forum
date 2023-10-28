import { useEffect, useState } from "react";
import { DataStore } from "../state/DataStore";
import { Badge } from "../components/ui/badge";
import { categories } from "../lib/categories";
import CreatePost from "../components/CreatePost";
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
  likes: [string];
  title: string;
  description: string;
  category: string;
  createdAt: string;
  creator: DataDetails;
};
export default function Home() {
  const UserData = DataStore((state) => state.UserData);
  const getUserData = DataStore((state) => state.getUserData);
  const AllPosts = DataStore((state) => state.AllPosts);
  const getAllPosts = DataStore((state) => state.getAllPosts);
  const [category, setCategory] = useState("");
  const [fillteredData, setFillteredData] = useState<PostDetails[] | null>(
    null
  );

  useEffect(() => {
    getUserData();
    getAllPosts();
  }, [getAllPosts, getUserData]);

  useEffect(() => {
    if (AllPosts) {
      setFillteredData(AllPosts?.filter((post) => post.category === category));
    }
  }, [AllPosts, category]);

  return (
    <div className="w-full flex flex-col items-center">
      {<CreatePost userID={UserData?._id} />}
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
      <div className="w-full h-screen md:p-0 pb-96 md:pb-64 overflow-y-scroll flex flex-col-reverse  ">
        {!category ? (
          AllPosts &&
          AllPosts.map((post, i) => (
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
