import React from "react";
import { IoMdSearch } from "react-icons/io";

function SearchModel() {
  return (
    // <div className="relative p-[100px] w-full flex justify-center">
    <div className="relative  bg-[rgba(25,30,37,.8)] w-[75%] h-[136px] rounded-xl flex justify-center items-center shadow-search-box">
      <div className="h-[calc(100%-70px)] w-[calc(100%-70px)] ">
        <form
          action=""
          method="get"
          className="w-full h-full bg-[#33373d] rounded-[8px] px-5 flex justify-center items-center focus:ring-2 focus:ring-blue-500 gap-3"
        >
          <div className="w-[6%] flex justify-center items-center">
            <IoMdSearch className="w-9 h-9 text-[#AAAAAA]" />
          </div>
          <input
            type="text"
            className="bg-transparent text-xl text-[#cdcbcb] font-Kanit font-semibold w-full h-full outline-none "
            placeholder="Search"
          />
          <span className=" p-2  rounded-md text-xl font-Kanit font-semibold text-[#AAAAAA] flex justify-center items-center hover:bg-white hover:text-gray-800 cursor-pointer ">
            Clear
          </span>
        </form>
      </div>
    </div>
    // </div>
  );
}

export default SearchModel;
