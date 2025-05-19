import React from "react";

const NavbarComponent = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-white shadow-sm">
      {/* Logo */}
      <div>
        <a href="/">
          <h2 className="text-xl font-bold text-blue-600">PMS</h2>
        </a>
      </div>

      {/* Buttons */}
      <div className="space-x-4">
        <a href="/auth/login">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white transition">
            Login
          </button>
        </a>
        <a href="/auth/register">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 transition">
            Register
          </button>
        </a>
      </div>
    </nav>
  );
};

export default NavbarComponent;
