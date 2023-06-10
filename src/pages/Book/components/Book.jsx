import { useEffect, useState } from "react";
import styles from "./Book.module.scss";

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
    <div className={styles.book}>
      <div className={styles.title}>{title}</div>
      <div className={styles.page}>{pages[currentPageNum]}</div>
      <div className={styles.controller}>
        <button onClick={prevPage} disabled={currentPageNum === 0}>
          {"<"}
        </button>
        <div className={styles["current-page"]}>{currentPageNum + 1}</div>
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
