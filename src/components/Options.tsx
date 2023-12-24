"use client";
import { HiX } from "react-icons/hi";
import { HiPlus } from "react-icons/hi2";

const Options = () => {
  return (
    <div className="absolute bg-gray-300 border-2 rounded-md">
      <div className="flex flex-row items-center gap-2">
        <HiPlus />
        <span>Add</span>
      </div>
      <div className="flex flex-row items-center gap-2">
        <HiX />
        <span>Remove</span>
      </div>
    </div>
  );
};

export default Options;
