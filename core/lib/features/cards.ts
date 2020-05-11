export interface Card {
  id: number;
  parentDir: string;
  filename: string;
  content: string;
  title?: string;
  rootFilePath?: string;
}

export default function(db: any) {
  return {
    listCards(): Card[] {
      var res = db.exec("SELECT * FROM cards");
      if (res.length == 0) {
        return [];
      }
      let [{ columns, values }] = res;
      // convert array of arrays to array of objects
      values = values.map(row => {
        return columns.reduce((acc, col, idx) => {
          acc[col] = row[idx];
          return acc;
        }, {});
      });
      return values;
    },
    insertCards(cards: Card[]) {
      let base = "insert into cards (id, parentDir, filename, content) values ";
      let [sql, values] = cards.reduce(
        (acc, card, idx) => [
          (acc[0] += `${idx == 0 ? "" : ","} (?, ?, ?, ?)`),
          acc[1].concat([card.id, card.parentDir, card.filename, card.content])
        ],
        [base, []]
      );
      db.run(sql, values);
    }
  };
}
