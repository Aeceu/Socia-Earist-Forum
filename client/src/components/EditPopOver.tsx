import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { DataStore } from "../state/DataStore";
import { useState, useEffect, useRef } from "react";
import AutoResize from "../lib/autoresize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { LucideLoader2 } from "lucide-react";
import { categories } from "../lib/categories";
import { PostStore } from "../helpers/PostHelpers";

export default function EditPopOver() {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const post = DataStore((state) => state.post);
  const getPost = DataStore((state) => state.getPost);
  const handleUpdatePost = PostStore((state) => state.handleUpdatePost);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, data.description);

  useEffect(() => {
    if (post) {
      setData({
        title: post?.title,
        description: post?.description,
        category: post?.category,
      });
    }
  }, [post]);

  return (
    <Dialog open={toggle}>
      <DialogTrigger
        onClick={() => setToggle(true)}
        className="text-emerald-500 font-bold cursor-pointer p-2 text-sm hover:bg-muted-foreground/20 w-full flex rounded-md hover:text-black"
      >
        Edit
      </DialogTrigger>
      <DialogContent className="border-red-500">
        <DialogHeader>
          <DialogTitle>
            <input
              className="w-full outline-none"
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </DialogTitle>
          <DialogDescription>
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              ref={textareaRef}
              rows={10}
              cols={1}
              className=" resize-none outline-none w-full bg-inherit placeholder:text-stone-600"
            />
          </DialogDescription>
          <DialogDescription className="w-full flex justify-between gap-2 text-sm ">
            <Select>
              <SelectTrigger className="z-100 outline-none w-[100px] h-[25px] bg-inherit border-red-500 text-red-500">
                <SelectValue
                  placeholder={data.category ? data.category : "Category"}
                />
              </SelectTrigger>
              <SelectContent className=" outline-none border-red-500">
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
                onClick={() => setToggle(false)}
                type="button"
                className="text-red-500"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleUpdatePost({
                    data,
                    postID: post?._id,
                    setData,
                    setLoading,
                    setToggle,
                  }).then((success) => {
                    success && post?._id && getPost(post?._id);
                  })
                }
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
