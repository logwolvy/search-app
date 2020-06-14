// Rounds off to 2 decimal places
const roundOff = (decimal) =>
  Math.round((decimal + Number.EPSILON) * 100) / 100;

export { roundOff };
