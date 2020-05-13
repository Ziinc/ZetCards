import * as assert from "assert";
import Core from "../../../lib";
import { RawCard } from "../../../lib/features/cards";

describe("utils", function() {
  let core;
  before(async function() {
    const deps = {
      refreshCards: (): RawCard[] => []
    };
    core = await Core.init(deps);
  });
  it("core.utils.newId can generate a file ID", () => {
    const newId = core.utils.newId();
    assert.equal(`${newId}`.length, 13);
    assert.equal(Number.isInteger(newId), true);
  });
  it("core.utils.checkFormat checks if string matches correct format of {id}-{filename}", () => {
    const id = core.utils.newId();
    const correctFormat = `${id}-my_filename123123`;
    const wrongFormat = `${id}asdasd-my_filename`;
    assert.equal(core.utils.checkFormat(correctFormat), true);
    assert.equal(core.utils.checkFormat(wrongFormat), false);
  });
  it("can identify file id from string", () => {
    const id = core.utils.newId();
    const filename = `${id}-my_filename`;
    const parsedId = core.utils.getIdFromString(filename);
    assert.equal(id, parsedId);
  });
});
