import Base from "./Base";
import data from "../data/data.json";

jest.mock("../data/data.json");

const testBooksData = {
  titles: ["Anything You Want"],
  summaries: [
    {
      id: 0,
      summary:
        "The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier. Being mindful doesn\u2019t change the problems in your life, but mindfulness does help you respond to your problems rather than react to them. Mindfulness helps you realize that striving for success is fine as long as you accept that the outcome is outside your control.",
    },
  ],
  authors: [
    {
      book_id: 0,
      author: "Dan Harris",
    },
  ],
  queries: [],
};

test("data property after setup", () => {
  // Setup test data
  data.titles = ["Anything You Want"];
  data.summaries = [
    {
      id: 0,
      summary:
        "The Book in Three Sentences: Practicing meditation and mindfulness will make you at least 10 percent happier. Being mindful doesn\u2019t change the problems in your life, but mindfulness does help you respond to your problems rather than react to them. Mindfulness helps you realize that striving for success is fine as long as you accept that the outcome is outside your control.",
    },
  ];
  data.authors = [
    {
      book_id: 0,
      author: "Dan Harris",
    },
  ];

  Base.setup();

  expect(Base.data).toEqual(testBooksData);
});

test("built inverted index", () => {
  const testData = {
    summaries: [
      {
        id: 0,
        summary: "foo bar baz",
      },
      {
        id: 1,
        summary: "foo bar foo",
      },
    ],
  };

  expect(Base.buildInvertedIndex(testData)).toEqual({
    foo: [
      { doc_id: 0, frequency: 1 },
      { doc_id: 1, frequency: 2 },
    ],
    bar: [
      { doc_id: 0, frequency: 1 },
      { doc_id: 1, frequency: 1 },
    ],
    baz: [{ doc_id: 0, frequency: 1 }],
  });
});

test("summary sanitization for prefix and special characters", () => {
  const summaries = [
    {
      original:
        "The Book in Three Sentences: Being mindful doesn\u2019t change the problems in your life.",
      sanitized: "Being mindful doesnt change the problems in your life.",
    },
    {
      original:
        "some\u00a0are not\u2014do not \u201cconfuse the two\u201d and do not desire the things",
      sanitized:
        "some are not do not confuse the two and do not desire the things",
    },
  ];

  summaries.forEach((summary) =>
    expect(Base.sanitizeSummary(summary.original)).toBe(summary.sanitized)
  );
});
