import { useState } from "react";
import Book from "./components/Book";
import "./index.css";

const books = [
  {
    id: "book-1",
    title: "book1",
    pages: ["page 1", "page 2", "page 3", "page 4", "page 5"],
  },
  {
    id: "book-2",
    title: "book2",
    pages: ["page 1", "page 2", "page 3", "page 4", "page 5"],
  },
  {
    id: "book-3",
    title: "book3",
    pages: ["page 1", "page 2", "page 3", "page 4", "page 5"],
  },
];

const BookPage = () => {
  const [activeBookId, setActiveBookId] = useState(books[0].id);

  const onBookClick = (id) => {
    setActiveBookId(id);
  };

  return (
    <div className="main">
      <div className="nav">
        {books.map(({ title, id }) => (
          <button
            onClick={onBookClick.bind(null, id)}
            className="book-btn"
            key={id}
          >
            {title}
          </button>
        ))}
      </div>
      <Book book={books.find((b) => b.id === activeBookId)} />
    </div>
  );
};

export default BookPage;
