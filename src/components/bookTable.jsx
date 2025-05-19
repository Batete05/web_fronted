import React from "react";

const BookTable = ({ books, currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <table className="w-full text-left border mt-4">
        <thead>
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Year</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, idx) => (
            <tr key={idx}>
              <td className="p-2 border">{book.title}</td>
              <td className="p-2 border">{book.author}</td>
              <td className="p-2 border">{book.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <p>
          Page {currentPage} of {totalPages}
        </p>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BookTable;
