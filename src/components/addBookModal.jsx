import React, { useState } from "react";

const AddBookModal = ({ onClose, onAdd }) => {
  const [formData, setFormData] = useState({ title: "", author: "", year: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border mb-2 p-2"
            placeholder="Title"
            name="title"
            onChange={handleChange}
            required
          />
          <input
            className="w-full border mb-2 p-2"
            placeholder="Author"
            name="author"
            onChange={handleChange}
            required
          />
          <input
            className="w-full border mb-4 p-2"
            placeholder="Year"
            name="year"
            type="number"
            onChange={handleChange}
            required
          />
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
    