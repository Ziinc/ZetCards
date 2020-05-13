import * as assert from "assert";
import Core from "../../../lib";
import { RawCard } from "../../../lib/features/cards";

describe("cards", function() {
  it("can load core without any cards", async function() {
    const deps = {
      refreshCards: (): RawCard[] => []
    };
    let core = await Core.init(deps);
    assert.equal(core.cards.listCards().length, 0);
  });
  it("core.cards.getCard gets card by id", async function() {
    const card = {
      id: 123123,
      parentDir: "/notes",
      filename: "my_random_note.md",
      content: "Some markdown content"
    };
    const deps = {
      refreshCards: (): RawCard[] => [card]
    };
    let core = await Core.init(deps);
    assert.equal(core.cards.getCard(123123).id, card.id);
  });
});
