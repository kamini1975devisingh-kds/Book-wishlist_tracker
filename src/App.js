import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  const addBook = () => {
    if (!title || !author) return;

    const newBook = {
      id: Date.now(),
      title,
      author,
      rating: 0,
      status: "Unread",
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const toggleStatus = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? {
              ...book,
              status: book.status === "Unread" ? "Read" : "Unread",
            }
          : book
      )
    );
  };

  const updateRating = (id, rating) => {
    setBooks(
      books.map((book) =>
        book.id === id ? { ...book, rating } : book
      )
    );
  };

  return (
  <div className="app">
   <div className="header">
  <span className="book-logo">📚</span>
  <h1>Book Wishlist Tracker</h1>
</div>

    <div className="form-container">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Author Name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <button className="add-btn" onClick={addBook}>
        Add Book
      </button>
    </div>

    <div className="book-grid">
      {books.map((book) => (
        <div className="book-card" key={book.id}>
          <h2>{book.title}</h2>

          <p className="author">{book.author}</p>

          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => updateRating(book.id, star)}
                style={{ cursor: "pointer" }}
              >
                {star <= book.rating ? "★" : "☆"}
              </span>
            ))}
          </div>

          <p className="status">
            Status: <span>{book.status}</span>
          </p>

          <div className="card-buttons">
            <button
              className="toggle-btn"
              onClick={() => toggleStatus(book.id)}
            >
              Toggle Status
            </button>

            <button
              className="delete-btn"
              onClick={() => deleteBook(book.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
export default App;