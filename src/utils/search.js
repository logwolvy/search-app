import pick from "lodash/pick";
import intersectionBy from "lodash/intersectionBy";
import flatten from "lodash/flatten";
import groupBy from "lodash/groupBy";
import { tokenize, tokenCombinatons } from "./query";
import { calculateMeanTF, calculateScore } from "./score";
import Book from "../models/Book";

// Users are not aware of book summaries in advance.
// So, doing an exact phrase search is impractical.
// Hence, for a given set of tokens, an intersection of matched documents
// yields better results. Also, a scoring strategy helps sorting by relevancy
// This utility implements the above

// NOTE: Contains redundant variable naming for expressing domain terminology

const search = (query, resultCount = 10) => {
  const docSelector = "doc_id";
  const matches = {};
  const tokens = tokenize(query);

  tokens.forEach((tkn) => {
    // store matched docIndexes
    matches[tkn] = Book.searchInvertedIndex("summary", tkn);
  });

  const tokenGroups = tokenCombinatons(tokens);
  const tokenGroupCount = tokenGroups.length;

  const results = [];
  for (let i = 0; i < tokenGroupCount; i++) {
    const currentTokenGroup = tokenGroups[i];

    // If enough results are found
    if (results.length >= resultCount) break;

    // Slice matches for current set of tokens
    let docGroupsByToken = Object.values(pick(matches, currentTokenGroup));

    // For easier filtering below
    const addedDocIds = results.map((doc) => doc[docSelector]);

    // Avoid duplication in partial searches by removing docs already added to results
    docGroupsByToken = docGroupsByToken.map((docGroup) =>
      docGroup.filter((doc) => !addedDocIds.includes(doc[docSelector]))
    );

    results.push(...scoreMatches(docGroupsByToken, docSelector, i));
  }

  return sortMatches(results);
};

const scoreMatches = (docGroupsByToken, docSelector, partialMatchFactor) => {
  // Intersection of token matches
  const collectedIntersectingDocs = collectIntersectingDocs(docGroupsByToken, docSelector)

  // Docs grouped by docSelector converted to 2d array to aid in calculation of mean term frequency
  const docGroupsById = Object.values(
    groupBy(collectedIntersectingDocs, docSelector)
  );

  // To account for term frequencies (tf) from mutiple terms for the same doc,
  // averaging TFs to get a single indicative value for score calculation
  const tfAveragedDocs = calculateMeanTF(
    docGroupsById,
    (meanTermFrequency, currentElem) => {
      return {
        meanTermFrequency,
        [docSelector]: currentElem[0][docSelector],
      };
    }
  );

  // Finally calculate and add score to docs
  const scoredDocs = tfAveragedDocs.map((docIndex) => {
    docIndex.score = calculateScore(docIndex, partialMatchFactor);
    return docIndex;
  });

  return scoredDocs;
};

const collectIntersectingDocs = (docGroupsByToken, docSelector) => {
  // Collect Doc IDs common between token matches
  const intersectingDocIds = intersectionBy(
    ...docGroupsByToken,
    docSelector
  ).map((doc) => doc[docSelector]);

  // Collect docs for intersectingDocIds
  const collectedIntersectingDocs = flatten(
    docGroupsByToken.map((docGroup) =>
      docGroup.filter((doc) => intersectingDocIds.includes(doc[docSelector]))
    )
  );

  return collectedIntersectingDocs;
}

const sortMatches = (matches) => {
  return matches.sort((a, b) => b.score - a.score);
};

export default search;
