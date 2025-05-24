import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/useStore";
import axios from 'axios';

export default function CategoryPage() {
    const [categories, setCategories ] = useState([]);
    const [loading, setLoading] = useState(true);
    const setCategory = useStore((state) => state.setCategory);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
      try {
        const res = await axios.get('https://gutendex.com/books/');
        const allSubjects = res.data.results.flatMap((book) => book.subjects);
        const uniqueCategories = [...new Set(allSubjects)];
        setCategories(uniqueCategories.slice(0, 20)); // Display only top 20 categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

    const handleSelect = (category) => {
        setCategory(category);
        navigate('/catalogue');
    };
    return(
       <div className="p-4 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Select a Book Category</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading categories...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => handleSelect(cat)}
              className="bg-white p-4 rounded-xl shadow-md hover:bg-blue-100 transition text-left text-sm"
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}