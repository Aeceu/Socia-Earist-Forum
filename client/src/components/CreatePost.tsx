import { useState, useRef } from "react";
import { LucidePenLine, LucideLoader2 } from "lucide-react";
import AutoResize from "../lib/autoresize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { categories } from "../lib/categories";
import { PostProps } from "../props";
import { PostStore } from "../helpers/PostHelpers";

type Props = {
  userID?: string;
};

export default function CreatePost({ userID }: Props) {
  const [data, setData] = useState<PostProps>({
    title: "",
    description: "",
    category: "general",
  });
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, data.description);
  const handleCreatePost = PostStore((state) => state.handleCreatePost);
  const handleCancel = PostStore((state) => state.handleCancel);

  return (
    <div
      ref={ref}
      className="w-full  hidden md:flex flex-col gap-2 items-center   py-2 "
    >
      {toggle && (
        <input
          onChange={(e) => setData({ ...data, title: e.target.value })}
          className="outline-none w-full bg-inherit  p-2"
          placeholder="write your title here..."
        />
      )}
      <span className="flex gap-2 items-center bg-inherit w-full p-2">
        {!toggle && <LucidePenLine className="text-red-500" />}
        <textarea
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          ref={textareaRef}
          rows={1}
          cols={1}
          className="resize-none outline-none w-full bg-inherit  "
          placeholder={`${
            toggle ? "write your description here..." : "create post..."
          }`}
        />
      </span>
      {toggle && (
        <div className="w-full flex justify-between gap-2 text-sm p-2">
          <Select value={data.category}>
            <SelectTrigger className="z-100 outline-none w-[100px] h-[25px] bg-inherit border-red-500 text-red-500">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className=" w-[70px] outline-none border-red-500">
              {categories.map((cat, i) => (
                <SelectItem
                  key={i}
                  value={cat.name}
                  onFocus={() => setData({ ...data, category: cat.name })}
                >
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="flex gap-2 items-center">
            <button
              onClick={() => handleCancel({ setData, setToggle })}
              type="button"
              className="text-red-500"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={() =>
                handleCreatePost({
                  data,
                  setData,
                  setLoading,
                  setToggle,
                  userID,
                })
              }
              type="button"
              className="text-emerald-500"
            >
              {loading ? (
                <LucideLoader2 size="1rem" className="animate-spin" />
              ) : (
                "Upload"
              )}
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
