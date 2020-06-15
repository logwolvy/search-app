import flatMap from "lodash/flatMap";
import combinations from "./combinations";

const tokenize = (query) => {
  // TODO: filter out common words
  // TODO: Add word stemming
  return query.split(" ").map((tkn) => tkn.trim().toLowerCase());
};

const tokenCombinatons = (tokens) =>
  flatMap(tokens, (v, idx, arr) => combinations(arr, idx + 1)).sort(
    (a, b) => b.length - a.length
  );

export { tokenize, tokenCombinatons };
