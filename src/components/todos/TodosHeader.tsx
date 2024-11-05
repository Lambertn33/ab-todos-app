import { ChevronRight } from "lucide-react";

const TodosHeader = () => {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <div className="flex flex-col gap-y-4">
      <div className="hidden lg:flex justify-between">
        <div className="flex gap-x-1 items-center">
          <span className="text-sm text-gray-400">Workspace</span>
          <ChevronRight className="h-6 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">Creative</span>
          <ChevronRight className="h-6 w-4 text-gray-400" />
          <span className="text-sm text-gray-900 font-semibold">
            Creative Website
          </span>
        </div>
        <span className="text-sm text-gray-900 font-semibold">
          From {today}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-2xl lg:text-3xl font-bold">Website Design</h2>
        <div className="flex items-center justify-between gap-x-1">
          <span className="w-2 h-2 bg-green-600 rounded-full block"></span>
          <span className="text-sm text-gray-400">Updated 12 mins ago</span>
        </div>
      </div>
    </div>
  );
};

export default TodosHeader;
