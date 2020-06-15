import Book from "./Book";

// Integration test
test("find doc with id", () => {
  Book.setup();

  expect(Book.find(3)).toEqual(expect.objectContaining({
    author: "James Webb Young",
    title: "The Nurture Assumption",
  }));
});
