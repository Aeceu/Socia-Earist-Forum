import { useEffect, useState } from "react";
import { DataStore } from "../state/DataStore";
import { Badge } from "../components/ui/badge";
import { categories } from "../lib/categories";
import PostCard from "../components/PostCard";
import { Loader2 } from "lucide-react";
import { PostDetails } from "../props";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const UserData = DataStore((state) => state.UserData);
  const getUserData = DataStore((state) => state.getUserData);
  const AllPosts = DataStore((state) => state.AllPosts);
  const getAllPosts = DataStore((state) => state.getAllPosts);
  const [category, setCategory] = useState("");
  const [fillteredData, setFillteredData] = useState<PostDetails[] | null>(
    null
  );

  useEffect(() => {
    try {
      setLoading(true);
      getUserData();
      getAllPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getAllPosts, getUserData]);

  useEffect(() => {
    if (AllPosts) {
      setFillteredData(AllPosts?.filter((post) => post.category === category));
    }
  }, [AllPosts, category]);

  return (
    <div className="w-full h-full md:pb-0 pb-[70px] flex flex-col  items-center ">
      {/* {<CreatePost userID={UserData?._id} />} */}
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
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <div className="w-full h-full flex flex-col overflow-y-scroll">
          {!category ? (
            AllPosts &&
            AllPosts.map((post, i) => (
              <PostCard
                key={i}
                data={post}
                setCategory={setCategory}
                userID={UserData?._id}
              />
            ))
          ) : fillteredData && fillteredData?.length > 0 ? (
            fillteredData.map((post, i) => (
              <PostCard
                key={i}
                data={post}
                setCategory={setCategory}
                userID={UserData?._id}
              />
            ))
          ) : (
            <h1 className="text-sm text-red-500 p-4">Empty...</h1>
          )}
        </div>
      )}
    </div>
  );
}
