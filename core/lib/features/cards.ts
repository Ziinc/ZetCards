import * as url from "url";
import * as path from "path";

export interface RawCard {
  id: number;
  parentDir: string;
  filename: string;
  content: string;
}
export interface Card {
  id: number;
  parentDir: string;
  filename: string;
  basename: string;
  content: string;
  rootFilePath: string;
}
export default function(db: any) {
  return {
    listCards(): Card[] {
      var res = db.exec("SELECT * FROM cards;");
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
    insertCards(cards: RawCard[]) {
      let base =
        "insert into cards (id, parentDir, filename, basename, content, rootFilePath) values ";
      let [sql, values] = cards.reduce(
        (acc, card, idx) => {
          let rootFilePath = path.resolve(
            card.parentDir,
            path.basename(card.filename, ".md")
          );

          return [
            (acc[0] += `${idx == 0 ? "" : ","} (?, ?, ?, ?, ?, ?)`),
            acc[1].concat([
              card.id,
              card.parentDir,
              card.filename,
              path.basename(card.filename, ".md"),
              card.content,
              rootFilePath
            ])
          ];
        },
        [base, []]
      );
      db.run(sql, values);
    },
    getCardFromPath(cardPath: string): Card {
      var sql = db.prepare("SELECT * FROM cards WHERE rootFilePath=?");

      // Bind values to the parameters and fetch the results of the query
      return sql.getAsObject([cardPath]);
    }
  };
}

// const convertMdLinksToCardLinks = (
//   card: Card,
//   links: MdLink[],
//   cards: Card[]
// ): CardLink[] => {
//   const cardLinks = links.reduce((acc, link) => {
//     const resolvedLink = path.resolve(card.parentDir, link.to);

//     if (linkedCard) {
//       acc.push({
//         toCardId: linkedCard.id,
//         altText: link.altText,
//         rootFilePath: resolvedLink
//       });
//     }
//     return acc;
//   }, []);

//   return cardLinks;
// };
