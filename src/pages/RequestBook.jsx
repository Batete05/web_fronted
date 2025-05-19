import React, { useState } from "react";
import NavbarComponent from "../components/navbarComponent";
import { servers } from "../../utils/api";

const RequestBook = () => {
  const [bookName, setBookName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("myToken");

    try {
      const response = await fetch(`${servers.activities}/bookRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookName }), // only send bookName
      });

      const data = await response.json();
      if (response.ok) {
        alert("Request submitted successfully");
        setBookName("");
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (error) {
      alert("Error sending request");
      console.error("Error: ", error);
    }
  };

  return (
    <>
      <NavbarComponent />
      <div className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Request a Book
        </h1>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded shadow"
        >
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Book Name</label>
            <input
              type="text"
              name="bookName"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </>
  );
};

export default RequestBook;
