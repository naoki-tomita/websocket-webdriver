import { createRandomString } from "../Random";

describe("Random", () => {
  describe("#createRandomString", () => {
    it("should create specified length", () => {
      const result = createRandomString(5);
      expect(result.length).toBe(5);
    });
  });
});