import axios from "axios";
import AutoResize from "../lib/autoresize";
import { LucideLoader2, LucideMessageSquare, LucideSend } from "lucide-react";
import { useState } from "react";
import { DataStore } from "../state/DataStore";

type Props = {
  userID: string;
  postID: string;
  textareaRef: any;
};

export default function CreateComment({ textareaRef, userID, postID }: Props) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  AutoResize(textareaRef.current, comment);
  const getAllComments = DataStore((state) => state.getAllComments);

  const baseUrl = "https://socia-earist-forum-backend.vercel.app";
  const handleAddComment = async () => {
    try {
      setLoading(true);
      await axios.post(`${baseUrl}/comment`, {
        comment: comment,
        postID: postID,
        userID: userID,
      });
      getAllComments(postID);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setComment("");
    }
  };

  return (
    <div className="w-full p-4 border-b flex gap-2 items-center">
      <LucideMessageSquare size={"1.3rem"} className="text-red-500" />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ref={textareaRef}
        rows={1}
        cols={1}
        className=" w-full outline-none bg-inherit px-1.5"
        placeholder="add comment here"
      />
      {loading ? (
        <LucideLoader2 className="animate-spin text-red-500 " />
      ) : (
        <LucideSend
          onClick={handleAddComment}
          size="1.3rem"
          className="text-red-500 cursor-pointer hover:scale-125 tranition-all duration300"
        />
      )}
    </div>
  );
}
