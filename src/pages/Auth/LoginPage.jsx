import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../../assets/image.png";
import { sendData } from "../../../utils/helpus";
import { servers } from "../../../utils/api";

const LoginPage = () => {
  const [data, setData] = useState({ email_phone: "", password: "" });
  const [popup, setPopup] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoader(true);
    setPopup("");

    const result = await sendData(`${servers.activities}/auth/net/login`, data, "");
    setLoader(false);

    if (result.error) {
      setPopup(result.error);
      return;
    }

    setSuccess("Check your email to verify your account.");
    setTimeout(() => {
      navigate("/auth/login/otp", { state: { email: data.email_phone } });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left Side Image with overlay */}
      <div className="w-1/2 hidden md:block relative">
        <img
          src={image}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-16">
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold text-blue-600 mb-2">
            Welcome Back!
          </h2>
          <p className="text-gray-600 mb-6">Sign in to continue.</p>

          {/* Error or info popup */}
          {popup && (
            <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
              {popup}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 text-green-700 bg-green-100 border border-green-300 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                name="email_phone"
                type="email"
                value={data.email_phone}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-gray-700">Password</label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                name="password"
                type="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={loader}
            >
              {loader ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* Bottom Links */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up now! →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
