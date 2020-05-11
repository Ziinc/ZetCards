import * as assert from "assert";
import Core from "../../../lib";
import { RawCard } from "../../../lib/features/cards";

describe("backlinks", function() {
  it("parses a list of notes, extracts and stores inbound and outbound links", async function() {
    const cards = [
      {
        id: 123123,
        parentDir: "/notes",
        filename: "my_random_note.md",
        content: "Some markdown content"
      },
      {
        id: 123122,
        parentDir: "/notes",
        filename: "same_dir.md",
        content:
          "[test](./my_random_note.md), [no rel link](my_random_note.md), [no ext](my_random_note)"
      }
    ];

    const deps = {
      refreshCards: (): RawCard[] => cards
    };
    let core = await Core.init(deps);

    assert.equal(core.links.listOutboundLinks(cards[0]).length, 0);
    assert.equal(core.links.listOutboundLinks(cards[1]).length, 3);

    assert.equal(core.links.listInboundLinks(cards[0]).length, 3);
    assert.equal(core.links.listInboundLinks(cards[1]).length, 0);
  });
});
