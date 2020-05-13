import * as assert from "assert";
import Core from "../../../lib";
import { RawCard } from "../../../lib/features/cards";

describe("links", function() {
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
  let core;
  before(async function() {
    const deps = {
      refreshCards: (): RawCard[] => cards
    };
    core = await Core.init(deps);
  });

  it("parses a list of notes, extracts and stores inbound and outbound links", async function() {
    const noLinkCard = core.cards.getCard(cards[0].id);
    const hasLinksCard = core.cards.getCard(cards[1].id);
    assert.equal(core.links.listOutboundLinks(noLinkCard).length, 0);
    assert.equal(core.links.listOutboundLinks(hasLinksCard).length, 3);

    assert.equal(core.links.listInboundLinks(noLinkCard).length, 3);
    assert.equal(core.links.listInboundLinks(hasLinksCard).length, 0);
  });

  it("can list inbound/outbound link using card id", async function() {
    assert.doesNotThrow(() => core.links.listOutboundLinks(cards[0].id));
  });
});
