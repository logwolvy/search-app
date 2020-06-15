import React from "react";
import { truncatedText } from "../../utils/text"
import "./card.css";

export default function card({ id, title, author, summary }) {
  return (
    <div className="card" key={id}>
      <div className="container">
        <h4>
          <b>{title}</b>
        </h4>
        <p>{truncatedText(summary, 10)}</p>
        <hr />
        <p>By {author}</p>
      </div>
    </div>
  );
}
