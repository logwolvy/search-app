import { roundOff } from "./decimal";

test("round off 1.029", () => {
  expect(roundOff(1.029)).toBe(1.03);
});
