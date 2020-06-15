import Book from "../models/Book";
import search from "./search";

jest.mock("../models/Book");

test("query 'foo bar baz'", () => {
  const modelResponse = {
    foo: [
      { doc_id: 3, frequency: 2 },
      { doc_id: 12, frequency: 1 },
      { doc_id: 15, frequency: 2 },
    ],
    bar: [
      { doc_id: 12, frequency: 1 },
      { doc_id: 15, frequency: 1 },
      { doc_id: 19, frequency: 1 },
    ],
    baz: [
      { doc_id: 3, frequency: 1 },
      { doc_id: 12, frequency: 1 },
      { doc_id: 15, frequency: 1 },
      { doc_id: 21, frequency: 1 },
    ],
  };

  const expectedResult = [
    {
      meanTermFrequency: 1.33,
      doc_id: 15,
      score: 11.33,
    },
    {
      meanTermFrequency: 1,
      doc_id: 12,
      score: 11,
    },
    {
      meanTermFrequency: 1.5,
      doc_id: 3,
      score: 4.83,
    },
    {
      meanTermFrequency: 1,
      doc_id: 19,
      score: 2.67,
    },
    {
      meanTermFrequency: 1,
      doc_id: 21,
      score: 2.43,
    },
  ];

  Book.searchInvertedIndex.mockImplementation(
    (_summary, token) => modelResponse[token]
  );
  expect(search("foo bar baz", 10)).toEqual(expectedResult);
});
