import { scriptPath } from "../LocationAnalyzer";

describe("LocationAnalyzer", () => {
  describe("scriptPath", () => {
    beforeAll(() => {
      location.href = "http://localhost:9999/path/to/js.js";
    });
    it("should return host.", () => {
      expect(scriptPath().host).toBe("");
    });
  });
});