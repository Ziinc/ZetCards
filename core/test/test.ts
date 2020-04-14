import * as assert from "assert";
import { testingFunction } from "../lib/index";
describe("Array", function() {
  describe("#indexOf()", function() {
    it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });

  describe("index.js", function() {
    it("should return hello!", function() {
      const res = testingFunction();
      assert(res, "hello!");
    });
  });
});
