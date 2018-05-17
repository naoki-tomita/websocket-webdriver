import { log, error } from "../Logger";

describe("Logger", () => {
  describe("#log", () => {
    beforeAll(() => {
      console.log = jest.fn();
    });
    it("should log to console.log", () => {
      log("Called log");
      expect((console.log as jest.Mock).mock.calls[0][0]).toBe("[WS-D]Called log");
    });
  });

  describe("#error", () => {
    beforeAll(() => {
      console.error = jest.fn();
    });
    it("should log to console.log", () => {
      error("Error log");
      expect((console.error as jest.Mock).mock.calls[0][0]).toBe("[WS-D]Error log");
    });
  });
});