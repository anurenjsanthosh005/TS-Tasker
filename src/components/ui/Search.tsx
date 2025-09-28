import React from "react";

function Search() {
  return (
    <div className="flex flex-col items-end mr-[100px] mt-[15px] bg-transparent absolute">
      <div className=" text-black font-medium flex justify-center items-center gap-2">
        <input
          type="text"
          //   value={value}
          //   onChange={onChange}
          placeholder="Search Todos..."
          className="py-2 px-3 rounded-3xl border-3 border-blue-500 text-black focus:border-black focus:outline-none"
        />
        <button>
          <i className="fa-solid fa-magnifying-glass text-3xl text-black"></i>
        </button>
      </div>
    </div>
  );
}

export default Search;
