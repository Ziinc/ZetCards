import * as assert from "assert";
import Core from "../../../lib";
import { RawCard } from "../../../lib/features/cards";
import 'mocha'
describe("cards", function () {
  it("can load core without any cards", async function () {
    const deps = {
      refreshCards: (): RawCard[] => []
    };
    let core = await Core.init(deps);
    assert.strictEqual(core.cards.listCards().length, 0);
  });
  it("core.cards.getCard gets card by id", async function () {
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
    assert.strictEqual(core.cards.getCard(123123).id, card.id);
  });
  it("core.cards.createCard creates a new card", async function () {
    let depCallCount = 0;
    const deps = {
      refreshCards: (): RawCard[] => [],
      createFile: () => (depCallCount += 1)
    };
    let core = await Core.init(deps);
    let result;
    assert.doesNotThrow(() => {
      result = core.cards.createCard();
    });

    // saves card to store
    assert.strictEqual(core.cards.listCards().length, 1);
    let [fetched] = core.cards.listCards();
    // returns a card
    assert.strictEqual(fetched.id, result.id);
    // saves card to /inbox dir
    assert.strictEqual(result.parentDir, "/inbox");
    // calls injected dep
    assert.strictEqual(depCallCount, 1);
  });
});
