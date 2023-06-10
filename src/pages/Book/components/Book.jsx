import { useEffect, useState } from "react";
import "./Book.css";

const Book = ({ book }) => {
  const { title, pages } = book;
  const [currentPageNum, setCurrentPageNum] = useState(0);

  const nextPage = () => {
    setCurrentPageNum((prev) => prev + 1);
  };

  const prevPage = () => {
    setCurrentPageNum((prev) => prev - 1);
  };

  useEffect(() => {
    setCurrentPageNum(0);
  }, [book]);

  return (
    <div className="book">
      <div className="book__title">{title}</div>
      <div className="book__page">{pages[currentPageNum]}</div>
      <div className="book__controller">
        <button onClick={prevPage} disabled={currentPageNum === 0}>
          {"<"}
        </button>
        <div className="book__current-page">{currentPageNum + 1}</div>
        <button
          onClick={nextPage}
          disabled={currentPageNum === pages.length - 1}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Book;
