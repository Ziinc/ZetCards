import * as path from "path";

export default function(core: any) {
  return {
    viewCard(id: number) {
      // update state table
      let sql = core.db.prepare("update state set viewingId=?;");
      sql.run([id]);
    },
    resetViewer() {
      core.db.run("update state set viewingId=null");
    }
  };
}
