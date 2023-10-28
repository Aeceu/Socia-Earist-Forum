import { useState, useEffect, useRef } from "react";
import { LucidePenLine, LucideLoader2 } from "lucide-react";
import AutoResize from "../lib/autoresize";
import axios from "axios";
import { DataStore } from "../state/DataStore";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { categories } from "../lib/categories";

type dataProps = {
  title: string;
  description: string;
  category: string;
};

type Props = {
  userID?: string;
};

export default function CreatePost({ userID }: Props) {
  const [data, setData] = useState<dataProps>({
    title: "",
    description: "",
    category: " ",
  });
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, data.description);
  const getAllPosts = DataStore((state) => state.getAllPosts);

  useEffect(() => {
    setData({ ...data, category: "general" });
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      if (ref.current?.contains(e.target) || ref2.current?.contains(e.target)) {
        setToggle(true);
      } else {
        setToggle(false);
        setData({
          title: "",
          description: "",
          category: "",
        });
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const baseUrl = "http://localhost:4200";

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${baseUrl}/post/${userID}`, { data });
      toast.success(res.data.message);
      getAllPosts();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setData({
        title: "",
        description: "",
        category: "",
      });
      setToggle(false);
    }
  };

  const handleCancel = () => {
    setToggle(false);
    setData({
      title: "",
      description: "",
      category: "",
    });
  };

  return (
    <div className="w-full flex md:justify-center py-2 md:py-4 md:px-0 px-2 ">
      <div
        ref={ref}
        className="w-full md:w-1/2 flex flex-col gap-2 items-center border-2 bg-yellow-300 border-red-500 rounded-md  px-1 py-1.5 shadow-lg"
      >
        {toggle && (
          <input
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="outline-none w-full bg-inherit placeholder:text-stone-600"
            placeholder="Title"
          />
        )}
        <span className="flex gap-2 items-center bg-inherit w-full">
          {!toggle && <LucidePenLine className="text-red-500" />}
          <textarea
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            ref={textareaRef}
            rows={1}
            cols={1}
            className="resize-none outline-none w-full bg-inherit placeholder:text-stone-600"
            placeholder="create post..."
          />
        </span>
        {toggle && (
          <div className="w-full flex justify-between gap-2 text-sm ">
            <Select>
              <SelectTrigger className="z-100 outline-none w-[100px] h-[25px] bg-inherit border-red-500 text-red-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent
                ref={ref2}
                className="bg-yellow-300 w-[70px] outline-none border-red-500"
              >
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
                onClick={handleCancel}
                type="button"
                className="text-red-500"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleSubmit}
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
    </div>
  );
}
