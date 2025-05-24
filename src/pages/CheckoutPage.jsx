import useStore from '../store/useStore';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const selectedBooks = useStore((state) => state.selectedBooks);
  const removeBook = useStore((state) => state.removeBook);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();

  const handleConfirm = () => {
    alert('Checkout successful!');
    logout();
    navigate('/');
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {selectedBooks.length === 0 ? (
        <p>No books selected.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {selectedBooks.map((book) => (
              <div
                key={book.id}
                className="bg-white p-4 rounded-xl shadow border relative"
              >
                <h2 className="font-semibold mb-2">{book.title}</h2>
                <p className="text-sm text-gray-600 mb-2">
                  {book.authors.map((a) => a.name).join(', ') || 'Unknown Author'}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Category: {
                    book.subjects?.[0] || 'Unknown'
                  }
                </p>
                <button
                  onClick={() => removeBook(book.id)}
                  className="text-red-600 text-sm absolute top-2 right-2 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleConfirm}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Confirm Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}


