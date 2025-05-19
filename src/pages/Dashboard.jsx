import React, { useState, useEffect } from 'react';
import NavbarComponent from '../components/navbarComponent';
import { fetchData } from '../../utils/helpus';
import { servers } from '../../utils/api';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 5;  // Match backend default or adjust as needed

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('myToken');
        // Add page and limit query params for pagination
        const url = `${servers.activities}/book?page=${currentPage}&limit=${perPage}`;
        const result = await fetchData(url, token);

        if (result.error) {
          setError(result.error);
          setBooks([]);
        } else {
          // According to your backend, result should have Books and pagination
          setBooks(result.Books || []);
          setTotalPages(result.pagination?.totalPages || 1);
        }
      } catch (err) {
        setError('Failed to load books');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [currentPage]); // Reload when currentPage changes

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <NavbarComponent />
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">Books Dashboard</h1>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-600">Error: {error}</div>}

        {!loading && !error && (
          <>
            <div className="overflow-x-auto bg-white p-4 rounded shadow mb-4">
              <table className="min-w-full border">
                <thead className="bg-blue-100 text-blue-800">
                  <tr>
                    <th className="px-4 py-2 border">Book Name</th>
                    <th className="px-4 py-2 border">Author</th>
                    <th className="px-4 py-2 border">Publisher</th>
                    <th className="px-4 py-2 border">Year</th>
                    <th className="px-4 py-2 border">Subject</th>
                    <th className="px-4 py-2 border">ISBN</th>
                  </tr>
                </thead>
                <tbody>
                  {books.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No books found
                      </td>
                    </tr>
                  ) : (
                    books.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border">{book.bookName}</td>
                        <td className="px-4 py-2 border">{book.author}</td>
                        <td className="px-4 py-2 border">{book.publisher}</td>
                        <td className="px-4 py-2 border">{book.publishedYear}</td>
                        <td className="px-4 py-2 border">{book.subject}</td>
                        <td className="px-4 py-2 border">{book.bookIsbn}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600`}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-600`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
