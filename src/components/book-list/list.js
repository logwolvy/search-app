import React from "react";
import Card from "./card";
import "./list.css";

export default function list({ bookList }) {
  return (
    <>
      <hr className="rounded" />
      {bookList.length > 0 && (
        <div className="book-list-main row">
          {bookList.map((book) => (
            <div className="column" key={book.id}>
              <Card
                title={book.title}
                author={book.author}
                summary={book.summary}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
