import React from 'react';
import { DollarSign, Book, Eye, ShoppingCart } from 'lucide-react';

const BookshopHomepage = () => {
  const books = [
    { id: 1, title: "Zero to One", author: "Peter Thiel", price: 9.0, image: "https://via.placeholder.com/200x300" },
    { id: 2, title: "Chronicles of Narnia", author: "C.S. Lewis", price: 18.0, image: "https://via.placeholder.com/200x300" },
    { id: 3, title: "How Innovation Works", author: "Matt Ridley", price: 10.0, image: "https://via.placeholder.com/200x300" },
    { id: 4, title: "Psychology of Money", author: "Morgan Housel", price: 12.0, image: "https://via.placeholder.com/200x300" },
    { id: 5, title: "Atomic Habits", author: "James Clear", price: 11.99, image: "https://via.placeholder.com/200x300" },
    { id: 6, title: "The Alchemist", author: "Paulo Coelho", price: 8.99, image: "https://via.placeholder.com/200x300" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BOOKSHOP</h1>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-900 underline">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">About us</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a>
          </nav>
          <button className="bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            Create account
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="flex flex-col md:flex-row items-center mb-12">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl font-bold mb-4">Feast your eyes on a good book! 📚</h2>
            <p className="text-gray-600 mb-6">Discover worlds unknown, expand your horizons, and embark on literary adventures with our curated collection of books.</p>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">
              Start Exploring
            </button>
            <div className="flex mt-6">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="https://via.placeholder.com/40x40" alt={`User ${i + 1}`} className="w-10 h-10 rounded-full border-2 border-white -ml-2 first:ml-0" />
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center -ml-2">
                <span className="text-gray-600 text-xs">+</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src="https://via.placeholder.com/400x400" alt="Reader" className="w-full max-w-md mx-auto" />
          </div>
        </section>

        <section className="bg-gray-800 text-white py-8 px-4 rounded-lg mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <DollarSign size={32} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Affordable price</h3>
              <p className="text-sm">Great reads at great prices.</p>
            </div>
            <div className="text-center">
              <Book size={32} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Best quality</h3>
              <p className="text-sm">Curated selection of top titles.</p>
            </div>
            <div className="text-center">
              <Eye size={32} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">24/7 customer service</h3>
              <p className="text-sm">Always here to help you.</p>
            </div>
            <div className="text-center">
              <ShoppingCart size={32} className="mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Free delivery</h3>
              <p className="text-sm">On orders over $50.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Books</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {books.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                  <p className="text-gray-800 font-bold">${book.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center mx-auto">
              <Eye size={20} className="mr-2" />
              View all books
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Bookshop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BookshopHomepage;
