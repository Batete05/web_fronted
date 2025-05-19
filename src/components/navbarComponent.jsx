import React from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { handleLogout } from "../../utils/helpus";

const NavbarComponent = () => {
  const isAdmin = () => {
    const token = localStorage.getItem("myToken");
    const decoded = jwtDecode(token);
    if (decoded.role === "ADMIN") {
      return true;
    } else {
      return false;
    }
  };

  const logout = () => {
    handleLogout();
  }
  return (
    <nav className="bg-blue-600 p-4 text-white shadow">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-xl">
          PMS
        </Link>
        <div className="space-x-4">
          <Link to="/dashboard" className="hover:underline">
            Display Books
          </Link>
          {isAdmin() ? (
            <Link to="/add-book" className="hover:underline">
              Add Book
            </Link>
          ) : (
            <Link to="/request-book" className="hover:underline">
              Request Book
            </Link>
          )}
          <button className="hover:underline" onClick={logout}> Logout</button>
            
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
