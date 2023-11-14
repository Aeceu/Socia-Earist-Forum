import { useState, useRef } from "react";
import { LucideLoader2 } from "lucide-react";
import AutoResize from "../lib/autoresize";
import axios from "../api/axios";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { categories } from "../lib/categories";
import { useNavigate, useParams } from "react-router-dom";

type dataProps = {
  title: string;
  description: string;
  category: string;
};

export default function CreatePostPage() {
  const { id } = useParams();
  const [data, setData] = useState<dataProps>({
    title: "",
    description: "",
    category: "general",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  AutoResize(textareaRef.current, data.description);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`/post/${id}`, { data });
      toast.success(res.data.message);
      navigate("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setData({
        title: "",
        description: "",
        category: "general",
      });
    }
  };

  const handleCancel = () => {
    setData({
      title: "",
      description: "",
      category: "general",
    });
  };

  return (
    <div className="w-full h-full md:pb-0 pb-[70px] flex flex-col items-center p-4 gap-8 ">
      <h1 className="text-4xl text-red-500 font-bold drop-shadow-[0px_1.5px_1.5px_rgba(1234,179,8,.8)]">
        Create your post here.
      </h1>
      <div className="w-full flex shadow-xl ">
        <div
          ref={ref}
          className="w-full  flex flex-col gap-2 items-center   p-2  border shadow-2xl rounded-md"
        >
          <input
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="outline-none w-full bg-inherit  p-2 border-b"
            placeholder="write your title."
          />
          <span className="flex gap-2 items-center bg-inherit w-full p-2 border-b">
            <textarea
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              ref={textareaRef}
              rows={3}
              cols={1}
              className="resize-none outline-none w-full bg-inherit   "
              placeholder="write your description."
            />
          </span>
          <div className="w-full flex justify-between gap-2 text-sm p-2">
            <Select>
              <SelectTrigger className="z-100 outline-none w-[100px] h-[25px] bg-inherit border-red-500 text-red-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent
                ref={ref2}
                className=" w-[70px] outline-none border-red-500"
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
        </div>
      </div>
    </div>
  );
}
