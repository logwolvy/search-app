import { roundOff } from "./decimal";

const calculateMeanTF = (docGroups, cb) => {
  return docGroups.map((docs) => {
    const meanTermFrequency =
      docs.map((doc) => doc.frequency).reduce((a, b) => a + b, 0) / docs.length;

    return cb(roundOff(meanTermFrequency), docs);
  });
};

// Score based on match coverage, mean term frequency and position(TODO)
const calculateScore = (doc, partialMatchFactor) => {
  // TODO: add IDF factor to improve search relevance further
  const matchCoverageFactor = 1 / (partialMatchFactor + 1);
  const meanTermFrequency = doc.meanTermFrequency;

  const relevanceScore = 10 * matchCoverageFactor + meanTermFrequency;
  return roundOff(relevanceScore);
};

export { calculateMeanTF, calculateScore };
