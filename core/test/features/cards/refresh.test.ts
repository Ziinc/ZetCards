import Core from "../../../lib";
import * as assert from "assert";
import { ICard } from "../../../lib/features/cards";
describe("refresh", function() {
  it("loads notes with the injected dependency", async function() {
    const deps = {
      refreshCardsDep: (): ICard[] => [
        {
          id: "1",
          parentDir: "/notes",
          filename: "my_random_note.md",
          content: "Some markdown content"
        }
      ]
    };
    let core = await Core(deps);

    assert.equal(core.cards.listCards().length, 1);
  });
});
