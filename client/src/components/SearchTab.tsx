import { LucideSearch } from "lucide-react";

export default function SearchTab() {
  return (
    <div className="w-1/4 p-4 hidden md:flex flex-col border-l">
      <span className="shadow-inner border border-red-500 rounded-lg flex gap-2 items-center px-1">
        <LucideSearch size="1rem" className="text-red-500" />
        <input
          type="text"
          className="py-1 outline-none bg-inherit"
          placeholder="search text.."
        />
      </span>
    </div>
  );
}
