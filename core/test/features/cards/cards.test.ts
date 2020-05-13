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
});
