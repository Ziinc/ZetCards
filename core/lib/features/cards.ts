export interface ICard {
  id: string;
  parentDir: string;
  filename: string;
  content: string;
  title?: string;
  rootFilePath?: string;
}

export default function(db: any) {
  return {
    listCards(): ICard[] {
      var [{ columns, values }] = db.exec("SELECT * FROM hello");
      console.log(columns);
      console.log(values);
      return values;
    }
  };
}
