import React from "react";

function Upload() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] text-white flex justify-center items-center py-4 px-4  sm:px-24">
      <div className="w-full max-w-[90rem] bg-[#1C1C1E] rounded-lg p-8 shadow-zinc-900 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white text-center  sm:text-3xl">
          Upload
        </h1>
        <div className="upload-file relative w-full h-[20rem] bg-[#2C2C2E] flex justify-center items-center rounded-lg">
          <input
            type="file"
            id="file"
            onChange={(e) => console.log(e.target.files)}
            className=" top-0 left-0 w-full h-full opacity-0 bg-transparent z-10 cursor-pointer"
          />
          <div className="absolute flex flex-col items-center justify-center  w-[70%] ">
            <svg
              className=" w-[20%] my-auto sm:w-[10%]"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13,20H6a1,1,0,0,1-1-1V5A1,1,0,0,1,6,4h5V7a3,3,0,0,0,3,3h3v2a1,1,0,0,0,2,0V9s0,0,0-.06a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,12.05,2H6A3,3,0,0,0,3,5V19a3,3,0,0,0,3,3h7a1,1,0,0,0,0-2ZM13,5.41,15.59,8H14a1,1,0,0,1-1-1ZM8,8a1,1,0,0,0,0,2H9A1,1,0,0,0,9,8Zm6,4H8a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm6.71,5.29-2-2a1,1,0,0,0-.33-.21,1,1,0,0,0-.76,0,1,1,0,0,0-.33.21l-2,2a1,1,0,0,0,1.42,1.42l.29-.3V21a1,1,0,0,0,2,0V18.41l.29.3a1,1,0,0,0,1.42,0A1,1,0,0,0,20.71,17.29ZM12,18a1,1,0,0,0,0-2H8a1,1,0,0,0,0,2Z"
                fill="#6563ff"
              />
            </svg>
            <h1 className="text-l font-bold text-white text-center sm:text-xl">
              Drag and Drop Files
            </h1>
            <p className="text-md font-semibold text-gray-400 text-center ">
              or browse media on your computer
            </p>
          </div>
        </div>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter video title"
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Description
          </label>
          <textarea
            id="description"
            placeholder="Enter video description"
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Category
          </label>
          <select
            id="category"
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          >
            <option value="general">General</option>
            <option value="entertainment">ENTERTAINMENT</option>
            <option value="sports">SPORTS</option>
            <option value="news">NEWS</option>
            <option value="fashon">FASHON</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Upload;
