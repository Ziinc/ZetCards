// import * as assert from "assert";
// import { describe, it } from "mocha";
// // import * as myExtension from '../extension';
// import * as core from "../../lib/deps";
// import { testingFunction } from "core";

// describe("utils", () => {
//   it("can generate a file ID", () => {
//     const newId = core.utils.newId();
//     assert.equal(`${newId}`.length, 13);
//     assert.equal(Number.isInteger(newId), true);
//   });
//   it("checkFormat checks if string matches correct format of {id}-{filename}", () => {
//     const id = core.utils.newId();
//     const correctFormat = `${id}-my_filename123123`;
//     const wrongFormat = `${id}asdasd-my_filename`;
//     assert.equal(core.utils.checkFormat(correctFormat), true);
//     assert.equal(core.utils.checkFormat(wrongFormat), false);
//   });
//   it("can identify file id from string", () => {
//     const id = core.utils.newId();
//     const filename = `${id}-my_filename`;
//     const parsedId = core.utils.getIdFromString(filename);
//     assert.equal(id, parsedId);
//   });
//   it("installed core correctly", () => {
//     const res = testingFunction();
//     assert.equal(res, "hello!");
//   });
// });
