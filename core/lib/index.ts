import initSqlJs from "sql.js";
import Cards, { ICard } from "./features/cards";

interface Deps {
  refreshCardsDep: () => ICard[];
}
type App = {
  db: any;
  refresh: any;
  cards: any;
  refreshCardsDep: Deps["refreshCardsDep"];
};
export default async function(deps: Deps): Promise<App> {
  await initSqlJs()
    .then((SQL: any): any => new SQL.Database())
    .then(db => {
      this.db = db;
      let sqlstr = "CREATE TABLE hello (a int, b char);";
      sqlstr += "INSERT INTO hello VALUES (0, 'hello');";
      sqlstr += "INSERT INTO hello VALUES (1, 'world');";
      this.db.run(sqlstr);
    });

  this.refreshCardsDep = deps.refreshCardsDep;

  this.refresh = function() {
    let cards;
    if (this.refreshCardsDep) {
      cards = this.refreshCardsDep();
    }
    // insert into db
  };
  console.log(this.db);
  this.cards = Cards(this.db);
  return this;
}
