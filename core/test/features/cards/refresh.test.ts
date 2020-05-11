import Core from "../../../lib";
import * as assert from "assert";
import { RawCard } from "../../../lib/features/cards";
describe("refresh", function() {
  it("loads notes with the injected dependency", async function() {
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

    assert.equal(core.cards.listCards().length, 1);
    assert.deepEqual(core.cards.listCards()[0], {
      ...card,
      rootFilePath: "/notes/my_random_note",
      basename: "my_random_note"
    });
  });
});
