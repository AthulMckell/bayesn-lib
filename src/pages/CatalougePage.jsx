import { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function CataloguePage() {
  const category = useStore((state) => state.selectedCategory);
  const selectedBooks = useStore((state) => state.selectedBooks);
  const addBook = useStore((state) => state.addBook);
  const removeBook = useStore((state) => state.removeBook);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!category) return;

    const fetchBooks = async () => {
      try {
        const res = await axios.get(
          `https://gutendex.com/books/?topic=${encodeURIComponent(category)}`
        );
        setBooks(res.data.results);
      } catch (err) {
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [category]);

  const isSelected = (bookId) => selectedBooks.some((b) => b.id === bookId);

  const handleSelect = (book) => {
    if (isSelected(book.id)) {
      removeBook(book.id);
    } else {
      addBook(book);
    }
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-2">
        Books in: <span className="text-blue-600">{category}</span>
      </h1>

      {loading ? (
        <p>Loading books...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {books.map((book) => (
              <div
                key={book.id}
                className={`p-4 rounded-xl border shadow hover:shadow-lg transition ${
                  isSelected(book.id)
                    ? 'bg-blue-100 border-blue-500'
                    : 'bg-white'
                }`}
              >
                <h2 className="font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {book.authors.map((a) => a.name).join(', ') || 'Unknown Author'}
                </p>
                <button
                  onClick={() => handleSelect(book)}
                  className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {isSelected(book.id) ? 'Remove' : 'Select'}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-gray-700">
              Selected: {selectedBooks.length}/5 (Max 3 per category)
            </p>
            <button
              onClick={() => navigate('/checkout')}
              disabled={selectedBooks.length === 0}
              className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
