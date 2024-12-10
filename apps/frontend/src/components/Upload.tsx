import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

enum videoCategory {
  Entertainment = "ENTERTAINMENT",
  News = "NEWS",
  Sports = "SPORTS",
  Fashon = "FASHON",
  General = "GENERAL",
}

interface formData {
  title: string;
  description: string;
  category: videoCategory;
  file: File;
  thumbnail: File;
}

function Upload() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>({ mode: "onChange" });

  const handleUpload: SubmitHandler<formData> = (data) => {
    console.log(data); // You can handle the form data here
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] text-white flex justify-center items-center py-4 px-4 sm:px-24">
      <form
        onSubmit={handleSubmit(handleUpload)}
        className="w-full max-w-[90rem] bg-[#1C1C1E] rounded-lg p-8 shadow-zinc-900 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-white text-center sm:text-3xl">
          Upload
        </h1>
        <div className="upload-file-container relative w-full h-[20rem] bg-[#2C2C2E] flex justify-center items-center rounded-lg">
          <input
            type="file"
            className="top-0 left-0 w-full h-full opacity-0 bg-transparent z-10 cursor-pointer"
            {...register("file", {
              required: "File is required",
              validate: {
                fileSize: (file) => {
                  console.log(file);
                  return (
                    file.size <= 100 * 1024 * 1024 ||
                    "File size should be less than 100 MB"
                  ); // 5MB limit
                },
                fileType: (file) =>
                  file.type.includes("video") || "Only Video files are allowed",
              },
            })}
          />
          <div className="absolute flex flex-col items-center justify-center w-[70%]">
            <svg
              className="w-[20%] my-auto sm:w-[10%]"
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
        {errors.file && <p className="text-red-500">{errors.file.message}</p>}

        <div className="title-container">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters long",
              },
            })}
            placeholder="Enter video title"
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div className="description-container">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters long",
              },
            })}
            rows={4}
            placeholder="Enter video description"
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="category-container">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Category
          </label>
          <select
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">SELECT A CATEGORY</option>
            <option value={videoCategory.General}>GENERAL</option>
            <option value={videoCategory.Entertainment}>ENTERTAINMENT</option>
            <option value={videoCategory.Sports}>SPORTS</option>
            <option value={videoCategory.News}>NEWS</option>
            <option value={videoCategory.Fashon}>FASHON</option>
          </select>
          {errors.category && (
            <p className="text-red-500">{errors.category.message}</p>
          )}
        </div>

        <div className="thumbnail-container">
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-300 mb-1 "
          >
            Thumbnail
          </label>
          <input
            type="file"
            id="thumbnail"
            {...register("thumbnail", {
              required: "Thumbnail is required",
              validate: {
                fileSize: (file) => {
                  return (
                    file.size <= 5 * 1024 * 1024 ||
                    "Thumbnail size should be less than 5MB"
                  );
                },
                fileType: (file) => {
                  return (
                    ["image/jpeg", "image/png", "image/gif"].includes(
                      file.type
                    ) || "Only JPEG, PNG, and GIF images are allowed"
                  );
                },
              },
            })}
            placeholder="Enter video title"
            className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.thumbnail && (
            <p className="text-red-500">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* Add the Submit button */}
        <div className="submit-container mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-3 px-6 hover:bg-blue-700 focus:outline-none"
          >
            Upload Video
          </button>
        </div>
      </form>
    </div>
  );
}

export default Upload;
