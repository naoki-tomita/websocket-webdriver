jest.mock("../Environment");
import { scriptPath } from "../LocationAnalyzer";
import { environment } from "../Environment";

describe("LocationAnalyzer", () => {
  describe("scriptPath", () => {
    describe("no currentScript", () => {
      beforeAll(() => {
        environment.location.href = "http://localhost:9999/path/to/js.js";
      });
      it("should return host.", () => {
        expect(scriptPath().host).toBe("localhost");
        expect(scriptPath().scheme).toBe("http");
      });
    });

    describe("has currentScript", () => {
      beforeAll(() => {
        environment.location.href = "https://local.host:9999/path/to/js.js";
        (document.currentScript as HTMLScriptElement).src = "/path/to/js.js";
      });
      it("should return host.", () => {
        expect(scriptPath().host).toBe("local.host");
        expect(scriptPath().scheme).toBe("https");
      });
    });
  });
});