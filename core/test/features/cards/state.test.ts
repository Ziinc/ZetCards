import * as assert from "assert";
import Core, { App } from "../../../lib";
import { RawCard } from "../../../lib/features/cards";

describe("state", function() {
  let core: App;
  it("core.state returns current client state", async function() {
    core = await Core.init({ refreshCards: () => [] });
    assert.notStrictEqual(core.state, {
      viewingId: null,
      viewing: null
    });
  });
  it("calls pushState on init", async function() {
    var called = false;
    core = await Core.init({
      refreshCards: () => [],
      pushState: () => (called = true)
    });
    assert.equal(called, true);
  });
  it("calls pushState on handler call", async function() {
    let callCount = 0;
    core = await Core.init({
      refreshCards: () => [],
      pushState: () => (callCount += 1)
    });
    core.setState.resetViewer();
    assert.equal(callCount, 2);
  });
  describe("view cards", function() {
    before(async function() {
      const deps = {
        refreshCards: (): RawCard[] => [
          {
            id: 123123,
            parentDir: "/notes",
            filename: "my_random_note.md",
            content:
              "Some markdown content linking to [other](my_other_note.md)"
          },
          {
            id: 123122,
            parentDir: "/notes",
            filename: "my_other_note.md",
            content:
              "Some markdown content linking to [random](my_random_note.md)"
          }
        ]
      };
      core = await Core.init(deps);
    });
    it("updates state when viewing card", () => {
      assert.doesNotThrow(() => core.setState.viewCard(123123));
      assert.equal(core.state.viewingId, 123123);
      assert.equal(core.state.viewing.card.id, 123123);
      assert.equal(core.state.viewing.inboundLinks.length, 1);
      assert.equal(core.state.viewing.outboundLinks.length, 1);
      assert.doesNotThrow(() => core.setState.viewCard(123122));
      assert.equal(core.state.viewing.card.id, 123122);
      assert.equal(core.state.viewingId, 123122);
      assert.doesNotThrow(() => core.setState.resetViewer());
      assert.equal(core.state.viewing, null);
      assert.equal(core.state.viewingId, null);
    });
    it("inboundLinks/outboundLinks are objects of Link type", () => {
      core.setState.viewCard(123123);
      const inLink = core.state.viewing.inboundLinks[0];
      assert.equal(inLink.fromCardId, 123122);
      assert.equal(inLink.fromCard.id, 123122);
      assert.equal(inLink.toCardId, 123123);
      assert.equal(inLink.toCard.id, 123123);
      const outLink = core.state.viewing.outboundLinks[0];
      assert.equal(outLink.fromCardId, 123123);
      assert.equal(outLink.fromCard.id, 123123);
      assert.equal(outLink.toCardId, 123122);
      assert.equal(outLink.toCard.id, 123122);
    });
  });
});
