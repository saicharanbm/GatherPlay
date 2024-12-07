import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { usePostLogin } from "../services/mutations";
type signinErrors = {
  email?: string;
  password?: string;
};
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { mutate: login, error, isPending } = usePostLogin();
  const [errors, setErrors] = useState<signinErrors>({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validate = () => {
    const newErrors: signinErrors = {};
    formData.email = formData.email.trim();
    formData.password = formData.password.trim();

    if (!formData.email) {
      newErrors.email = "Email address is required";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
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
      login(formData, {
        onSuccess: (data) => {
          console.log("Login successful");
          console.log(data);
        },
        onError: (error) => {
          console.log("Login failed");
          console.log(error);
        },
      });
    }
  };
  return (
    <div className="w-full min-h-[calc(100vh-4rem)]  text-white flex justify-center items-center">
      <div className="w-full max-w-md bg-[#1C1C1E]  rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            {error && (
              <p className="text-sm text-red-500">
                {error as unknown as string}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg transition duration-300"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-400 font-semibold hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
