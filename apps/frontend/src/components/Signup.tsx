import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { usePostSignup } from "../services/mutations";
import { useNavigate } from "react-router-dom";

type signupErrors = {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { mutate: signup, error, isPending } = usePostSignup();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<signupErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false); // For password visibility
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // For confirm password visibility

  const validate = () => {
    const newErrors: signupErrors = {};
    formData.fullName = formData.fullName.trim();
    formData.email = formData.email.trim();
    formData.password = formData.password.trim();
    formData.confirmPassword = formData.confirmPassword.trim();

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted successfully:", formData);
      signup(formData, {
        onSuccess: (data) => {
          console.log("Signup successful");
          console.log(data);
          navigate("/login");
        },
        onError: (error) => {
          console.log("Signup failed");
          console.log(error);
        },
      });
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] text-white flex justify-center items-center py-4">
      <div className="w-full max-w-md bg-[#1C1C1E] rounded-lg p-8 shadow-zinc-900">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Sign Up
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name Field */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>

            <div className="relative w-full">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              />
              <div
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              >
                {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />}
              </div>
            </div>

            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative w-full">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full bg-[#2C2C2E] text-white rounded-lg p-3 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
              />
              <div
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-white"
              >
                {passwordVisible ? <FaEyeSlash /> : <IoEyeSharp />}
              </div>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
            {error && (
              <p style={{ color: "red" }}>{error as unknown as string}</p>
            )}
          </div>
          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
            >
              {isPending ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 font-semibold hover:underline "
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
