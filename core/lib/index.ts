import initSqlJs from "sql.js";
import Cards, { RawCard } from "./features/cards";
import Links from "./features/links";

interface Deps {
  refreshCards: () => RawCard[];
  pushState?: (state: State) => void;
}
export type State = any;
type App = {
  db: any;
  refresh: any;
  deps: Deps;
  cards: any;
  init: Promise<App>;
};

export default {
  async init(deps: Deps) {
    this.deps = deps;
    return initSqlJs()
      .then((SQL: any): any => new SQL.Database())
      .then(db => {
        // update the schema
        this.db = db;
        let sqlstr = `
        create table if not exists cards(
          id integer primary key,
          parentDir text,
          filename text,
          basename text,
          content text,
          rootFilePath text
        );
        create table if not exists links(
          toCardId integer references cards(id),
          fromCardId integer references cards(id),
          anchorText text
        );
        
        `;

        this.db.run(sqlstr);
        return this;
      })
      .then((app: App) => {
        app.refresh();
        return this;
      });
  },
  refresh() {
    let cards;

    if (this.deps.refreshCards) {
      cards = this.deps.refreshCards();
      this.cards.insertCards(cards);
      this.links.buildLinks();
    }
    // insert into db
  },
  get cards() {
    return Cards(this.db);
  },

  get links() {
    return Links(this.db);
  }
};
