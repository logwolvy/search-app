import Base from "./Base";

class Book extends Base {
  constructor(id, title, author, summary) {
    super();
    this.id = id;
    this.title = title;
    this.author = author;
    this.summary = summary.replace("The Book in Three Sentences:", "").trim();
  }
}

export default Book;
