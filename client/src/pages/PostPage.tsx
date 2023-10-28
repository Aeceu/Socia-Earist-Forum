import { Link, useParams, useNavigate } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { DataStore } from "../state/DataStore";
import { useState, useEffect, useRef } from "react";
import {
  LucideChevronLeftCircle,
  LucideLoader2,
  LucideMessageCircle,
  LucideMoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import toast from "react-hot-toast";
import axios from "axios";
import EditPopOver from "../components/EditPopOver";
import LikesTab from "../components/LikesTab";
import CreateComment from "../components/CreateComment";
import { dateconverter } from "../lib/dateconverter";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = DataStore((state) => state.post);
  const getPost = DataStore((state) => state.getPost);
  const [loading, setLoading] = useState(false);
  const UserData = DataStore((state) => state.UserData);
  const [likeCount, setLikeCount] = useState(0);
  const [isliked, setIsLiked] = useState<boolean>(false);
  const postcomments = DataStore((state) => state.postcomments);
  const getAllComments = DataStore((state) => state.getAllComments);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const baseUrl = "http://localhost:4200";
  const handleDelete = async () => {
    try {
      setLoading(true);
      const res = await axios.delete(`${baseUrl}/post/${post?._id}`);
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      if (id) {
        setLoading(true);
        getPost(id);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [getPost, id]);

  useEffect(() => {
    if ((UserData?._id, post?._id)) {
      getAllComments(post?._id);
      fetchLikes();
    }
  }, [UserData?._id, post]);

  const fetchLikes = async () => {
    try {
      const res = await axios.post(`${baseUrl}/like`, {
        userID: UserData?._id,
        postID: id,
      });
      setLikeCount(res.data.count);
      setIsLiked(res.data.isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFocus = () => {
    textareaRef.current && textareaRef.current.focus();
  };

  return (
    <div className="w-full min-w-[calc(100vw-200px)] flex flex-col  items-center ">
      <div className="relative w-full border-b px-4 py-4">
        <span className="flex items-center gap-2 text-black text-base">
          <Link to={"/"}>
            <LucideChevronLeftCircle className="text-red-500 hover:text-yellow-300 hover:scale-125 transition-all duration-300" />
          </Link>
          <Badge>{post?.category}</Badge>
          <p className="">{`posted by - ${post?.creator?.firstname} ${post?.creator.lastname}  `}</p>
          <div className="text-xs">{`(${dateconverter({
            date: post?.createdAt.split("T")[0],
          })})`}</div>
        </span>
        <span className="flex flex-col gap-1 p-2">
          <p className="truncate text-xl">{post?.title}</p>
          <p className="text-sm break-words">{post?.description}</p>
        </span>
        {UserData?._id === post?.creator._id && (
          <div className="absolute right-3 top-3 z-50">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <LucideMoreVertical size={"1rem"} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-red-500">
                <EditPopOver />
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
                    "Delete"
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        <span className="flex gap-4 items-center p-2 transition-all duration-300">
          <LikesTab
            id={id}
            fetchLikes={fetchLikes}
            isliked={isliked}
            likeCount={likeCount}
          />
          <LucideMessageCircle
            onClick={handleFocus}
            size="1rem"
            className="hover:scale-125 hover:text-blue-500 cursor-pointer transition-all duration-300"
          />
        </span>
      </div>
      {post && UserData && (
        <CreateComment
          textareaRef={textareaRef}
          postID={post?._id}
          userID={UserData?._id}
        />
      )}
      <div className="w-full">
        {postcomments && postcomments?.length > 0 ? (
          postcomments?.map((com, i) => (
            <div key={i} className="w-full p-4 flex gap-2 items-center ">
              <Link to={`/profile/${com.commentor._id}`}>
                <Badge className="text-[10px]">{`${com.commentor.firstname} ${com.commentor.lastname}`}</Badge>
              </Link>
              <p>{com.comment}</p>
            </div>
          ))
        ) : (
          <h1 className="p-4 text-red-500 font-bold">No comments...</h1>
        )}
      </div>
    </div>
  );
}
