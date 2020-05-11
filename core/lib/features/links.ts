import Core from "../index";
import * as url from "url";
import * as path from "path";
import { Card } from "./cards";
type Link = {
  fromCardId: number;
  toCardId: number;
  anchorText: string;
};

type NoteLink = {
  toNoteId: string;
  altText: string;
  rootFilePath: string;
};
type MdLink = {
  altText: string;
  to: string;
};
export default function(db: any) {
  return {
    buildLinks() {
      let cards = Core.cards.listCards();
      if (cards.length == 0) return;
      let links = cards.reduce(
        (acc, card) => acc.concat(this.extractLinks(card)),
        []
      );
      if (links.length == 0) return;
      let base = "insert into links (toCardId, fromCardId, anchorText) values ";
      let [sql, values] = links.reduce(
        (acc, link, idx) => {
          return [
            (acc[0] += `${idx == 0 ? "" : ","} (?, ?, ?)`),
            acc[1].concat([link.toCardId, link.fromCardId, link.anchorText])
          ];
        },
        [base, []]
      );
      sql = sql + ";";
      db.run(sql, values);
    },
    extractLinks(card: Card) {
      let links = [];
      let match;
      const inlineRegexp = /\[([^\[]+)\]\(([^\)]+\w*)\)/g;
      const referenceRegexp = /\[([a-zA-z0-9_-]+)\]:\s*(\S+)/g;
      [inlineRegexp, referenceRegexp].forEach(regexp => {
        while ((match = regexp.exec(card.content))) {
          const toPath = match[2];

          //   resolve the path of the card, parse it and remove the .md ext
          let resolvedTo = path.resolve(card.parentDir, toPath);
          let parsed = path.parse(resolvedTo);
          parsed.base = path.basename(resolvedTo, ".md");
          let pathTo = path.format(parsed);

          const toCard = Core.cards.getCardFromPath(pathTo);
          links.push({
            fromCardId: card.id,
            toCardId: toCard.id,
            anchorText: match[1]
          });
        }
      });

      return links;
    },
    listInboundLinks(card: Card) {
      var res = db.exec("select * from links where toCardId=?", [card.id]);
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
    listOutboundLinks(card: Card) {
      var res = db.exec("select * from links where fromCardId=?", [card.id]);
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
//     let parsed = path.parse(resolvedLink);
//     parsed.base = path.basename(resolvedLink, ".md");
//     const linkedCard = cards.find(n => n.rootFilePath == path.format(parsed));
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

const extractLinks = (content): MdLink[] => {
  // Are there links?
  // grp 0 : full markdown match
  // grp 1: alt text or reference id
  // grp 2: unresolved link
  let links = [];
  let match;
  const inlineRegexp = /\[([^\[]+)\]\(([^\)]+\w*)\)/g;
  const referenceRegexp = /\[([a-zA-z0-9_-]+)\]:\s*(\S+)/g;
  [inlineRegexp, referenceRegexp].forEach(regexp => {
    while ((match = regexp.exec(content))) {
      links.push({
        altText: match[1],
        to: match[2]
      });
    }
  });

  return links;
};
