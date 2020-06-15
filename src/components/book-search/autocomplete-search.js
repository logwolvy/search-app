import React, { useState, useRef, useEffect } from "react";
import debounce from "lodash/debounce";
import "./autocomplete-search.css";
import search from "../../utils/search";
import BookList from "../book-list";
import Book from "../../models/Book";

export default function AutocompleteSearch() {
  const dropDown = useRef(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDropDownVisible, setIsDropDownVisible] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick, false);
    return () => {
      document.removeEventListener("mousedown", handleClick, false);
    };
  });

  const handleClick = (e) => {
    if (dropDown.current && dropDown.current.contains(e.target)) {
      return;
    }

    setIsDropDownVisible(false);
  };

  const delayedQuery = debounce((q) => {
    // console.log('------->', JSON.stringify({ results: fullTextSearch(q) }, null, 4));
    return setResults(search(q).map((rec) => Book.find(rec.doc_id)));
  }, 800);

  const handleQuery = (e) => {
    setQuery(e.target.value);
    setIsDropDownVisible(true);
    delayedQuery(e.target.value);
  };

  const handleBookSelection = (e) => {
    setIsDropDownVisible(false);
    setSelectedBook(e.target.value);
    setQuery(findBookInResults(e.target.value).title);
  };

  const handleFormSubmit = (e) => {
    setQuery("");
    setBookList([...bookList, findBookInResults(selectedBook)]);
    setSelectedBook(null);
  };

  const findBookInResults = (id) => {
    return results.find((book) => book.id === id);
  };

  return (
    <>
      <div className="wrap searchable">
        <input
          type="text"
          className="searchTerm"
          placeholder="Search for book suggestion(s)"
          onChange={handleQuery}
          value={query}
        />
        <button
          type="submit"
          className="searchButton"
          onClick={handleFormSubmit}
          disabled={selectedBook == null} // Since document id can be 0
        >
          Submit
        </button>
        {isDropDownVisible && results.length > 0 && (
          <ul ref={dropDown}>
            {results.map((result) => (
              <li
                key={result.id}
                value={result.id}
                onClick={handleBookSelection}
              >
                {result.title}
              </li>
            ))}
          </ul>
        )}
      </div>

      {bookList.length > 0 && (
        <div className="autocomplete-book-list">
          <BookList bookList={bookList} />
        </div>
      )}
    </>
  );
}
