import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { Badge } from "./ui/badge";
import { LucideHeart } from "lucide-react";

type DataDetails = {
  _id: string;
  studentID: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
type PostDetails = {
  _id: string;
  title: string;
  likes: [string];
  description: string;
  category: string;
  creator: DataDetails;
};
type Props = {
  data: PostDetails;
  setCategory: Dispatch<SetStateAction<string>>;
  userID?: string;
};

export default function PostCard({ data, setCategory, userID }: Props) {
  return (
    <div className=" relative  border-b p-4 ">
      <span className="flex items-center gap-2 text-black/70 text-[12px]">
        <Badge
          onClick={() => setCategory(data.category)}
          className="cursor-pointer"
        >
          {data.category}
        </Badge>
        <Link
          to={`/profile/${data.creator._id}`}
          className=" hover:text-blue-400"
        >{`posted by - ${data.creator?.firstname} ${data.creator.lastname}  `}</Link>
      </span>
      <Link
        to={`/post/${data._id}`}
        className="flex flex-col justify-center p-2  "
      >
        <p className="truncate line-clamp-6 max-w-[300px] text-[18px]  cursor-pointer hover:text-blue-500">
          {data.title}
        </p>
        <p className="line-clamp-1 max-w-[300px] text-xs hover:text-blue-500 ">
          {data.description}
        </p>
      </Link>
      <span
        className={`w-max  flex items-center gap-1 px-2 ${
          data.likes.some((like) => like === userID)
            ? "text-red-500"
            : "text-black"
        }`}
      >
        <h1 className="text-sm">{data.likes.length}</h1>
        <LucideHeart size="1rem" />
      </span>
    </div>
  );
}
