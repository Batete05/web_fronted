import React, { useState } from "react";
import { sendData } from "../../../utils/helpus";
import { servers } from "../../../utils/api";
import { useLocation, useNavigate } from "react-router-dom";
import NavbarComponent from "../../components/navbar";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [popup, setPopup] = useState("");
  const [sucess, setSuccess] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setPopup("Email is missing. Please login again.");
      return;
    }

    try {
      const result = await sendData(
        `${servers.activities}/auth/net/login/otp`,
        {
          email,
          verificationCode: otp,
        },
        ""
      );

      if (result.error) {
        setPopup(result.error);
        return;
      }

      localStorage.setItem("myToken", result.data.token);
      set("OTP verified! Redirecting...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      console.error(err);
      setPopup("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">
            Verify Your Email
          </h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Enter the OTP sent to your email to verify your account.
          </p>

          {popup && (
            <div className="mb-4 text-center text-red-500">{popup}</div>
          )}

          {sucess && (
            <div className="mb-4 text-center text-green-500">{sucess}</div>
          )}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default VerifyOtp;
