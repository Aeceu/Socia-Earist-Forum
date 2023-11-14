import AutoResize from "../lib/autoresize";
import { LucideLoader2, LucideMessageSquare, LucideSend } from "lucide-react";
import { useState } from "react";
import { DataStore } from "../state/DataStore";
import { PostStore } from "../helpers/PostHelpers";

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
  const handleAddComment = PostStore((state) => state.handleAddComment);

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
          onClick={() =>
            handleAddComment({
              comment,
              postID,
              setComment,
              setLoading,
              userID,
            }).then((success) => {
              success && getAllComments(postID);
            })
          }
          size="1.3rem"
          className="text-red-500 cursor-pointer hover:scale-125 tranition-all duration300"
        />
      )}
    </div>
  );
}
