import data from "../data/data.json";
import { tokenize } from "../utils/query";

class Base {
  static setup() {
    this.data = data;

    // Ideally this should be a sorted array to facilitate binary searches
    // and avoiding hash collisions. But for easier implementation, using an
    // object for now
    this.invertedIndex = this.buildInvertedIndex(this.data);
  }

  static buildInvertedIndex(data) {
    const invertedIndex = {};
    data.summaries.forEach((record) => {
      // Tokenize summary
      tokenize(this.sanitizeSummary(record.summary)).forEach((tkn) => {
        const token = tkn;
        const existingDocsGroupByToken = invertedIndex[token];
        const newDoc = { doc_id: record.id, frequency: 1 };

        // Token seen before
        if (existingDocsGroupByToken) {
          const existingDoc = existingDocsGroupByToken.find(
            (rec) => rec.doc_id === record.id
          );

          if (existingDoc) {
            // When doc has multiple occurrences of a token
            existingDoc.frequency++;
          } else {
            existingDocsGroupByToken.push(newDoc);
          }
        } else {
          invertedIndex[token] = [newDoc];
        }
      });
    });

    return invertedIndex;
  }

  static sanitizeSummary(summary) {
    return summary
      .replace("The Book in Three Sentences:", "")
      .replace(/(\u00A0)|(\u2014)/g, " ")
      .replace(/(\u201c)|(\u201d)|(\u2019)/g, "")
      .trim();
  }

  static searchInvertedIndex(_indexName, token) {
    // TODO: binary search over inverted index keys for tkn
    return this.invertedIndex[token];
  }

  static find(id) {
    const { titles, summaries, authors } = this.data;

    const title = titles[id];
    const author = (authors.find((rec) => rec.book_id === id) || {}).author;
    const summary = (summaries.find((rec) => rec.id === id) || {}).summary;

    return new this(id, title, author, summary);
  }
}

export default Base;
