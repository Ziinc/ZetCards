import * as assert from "assert";
import Core from "../../../lib";
import { RawCard } from "../../../lib/features/cards";

describe("state", function() {
  let core;
  before(async function() {
    const deps = {
      refreshCards: (): RawCard[] => [
        {
          id: 123123,
          parentDir: "/notes",
          filename: "my_random_note.md",
          content: "Some markdown content"
        },
        {
          id: 123122,
          parentDir: "/notes",
          filename: "my_other_note.md",
          content: "Some markdown content"
        }
      ]
    };
    core = await Core.init(deps);
  });
  it("core.state returns current client state", function() {
    const state = core.state;
    assert.notStrictEqual(state, {
      viewingId: null,
      viewing: null
    });
  });
  it("calls pushState");
  describe("view cards", function() {
    it("updates state when viewing card", () => {
      assert.doesNotThrow(() => core.setState.viewCard(123123));
      assert.equal(core.state.viewingId, 123123);
      assert.equal(core.state.viewing.card.id, 123123);
      assert.equal(core.state.viewing.inboundLinks.length, 0);
      assert.equal(core.state.viewing.outboundLinks.length, 0);
      assert.doesNotThrow(() => core.setState.viewCard(123122));
      assert.equal(core.state.viewing.card.id, 123122);
      assert.equal(core.state.viewingId, 123122);
      assert.doesNotThrow(() => core.setState.resetViewer());
      assert.equal(core.state.viewing, null);
      assert.equal(core.state.viewingId, null);
    });
  });
});
