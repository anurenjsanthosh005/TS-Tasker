import React, { useContext } from "react";
import Input from "./ui/Input";
import { useTask } from "../context/contextHooks";

function EditTask() {
    const {editClose}= useTask()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className=" min-w-auto bg-blue-200 w-[950px] absolute p-2 flex-shrink-0 border-3 rounded-xl border-white">
        <div className="flex justify-end text-xl ">
          <button
            className="hover:scale-110 transition-transform"
            onClick={()=>editClose()}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="flex flex-col justify-center items-center flex-shrink-0 break-words pb-5">
          <Input/>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
