import initSqlJs from "sql.js";
import Cards, { Card } from "./features/cards";

interface Deps {
  refreshCardsDep: () => Card[];
}
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
        create table if not exists cards (
          id integer primary key,
          parentDir text,
          filename text,
          content text
        )
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

    if (this.deps.refreshCardsDep) {
      cards = this.deps.refreshCardsDep();
      this.cards.insertCards(cards);
    }
    // insert into db
  },
  get cards() {
    return Cards(this.db);
  }
};
