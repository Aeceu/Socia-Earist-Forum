import { DataStore } from "../state/DataStore";
import axios from "axios";
import { LucideHeart } from "lucide-react";

type Props = {
  id: string | undefined;
  fetchLikes: () => Promise<void>;
  isliked: boolean;
  likeCount: number;
};

export default function LikesTab({
  id,
  fetchLikes,
  isliked,
  likeCount,
}: Props) {
  const UserData = DataStore((state) => state.UserData);
  const baseUrl = "https://socia-earist-forum-backend.vercel.app";

  const handleLike = async () => {
    try {
      await axios.post(`${baseUrl}/like/${id}`, {
        likerID: UserData?._id,
      });

      fetchLikes();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span
      onClick={handleLike}
      className={`hover:text-red-500 flex items-center gap-1 cursor-pointer " ${
        isliked ? "text-red-500" : "text-black"
      }`}
    >
      <h1 className="text-sm">{likeCount}</h1>
      <LucideHeart size="1rem" className=" " />
    </span>
  );
}
