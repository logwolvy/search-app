import { tokenize } from "./query";

test("tokenization for 'foo bar baz'", () => {
  expect(tokenize("foo bar baz")).toEqual(["foo", "bar", "baz"]);
});
