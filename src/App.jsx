import { useState } from "react";
import NavbarComponent from "./components/navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import VerifyOtp from "./pages/Auth/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import { PopupProvider } from "../context/popUpContext";
import Popup from "./popup";
import RequestBook from "./pages/RequestBook";

function App() {
  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/login/otp" element={<VerifyOtp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/request-book" element={<RequestBook />} />
          </Routes>
        </Router>
        <PopupProvider>
          <Popup/>
        </PopupProvider>
      </div>
    </>
  );
}

export default App;
