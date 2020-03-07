import * as vscode from "vscode";
import { isObject } from "util";
const fs = require("fs");
var elasticlunr = require("elasticlunr");
const path = require("path");
let index;
export const buildSearchIndex = async () => {
  if (index) return;
  index = elasticlunr(function () {
    this.setRef("id");
    this.addField("title");
    this.addField("body");
  });
  var doc1 = {
    id: 1,
    title: "Oracle released its latest database Oracle 12g",
    body:
      "Yestaday Oracle has released its new database Oracle 12g, this would make more money for this company and lead to a nice profit report of annual year."
  };

  var doc2 = {
    id: 2,
    title: "Oracle released its profit report of 2015",
    body:
      "As expected, Oracle released its profit report of 2015, during the good sales of database and hardware, Oracle's profit of 2015 reached 12.5 Billion."
  };

  index.addDoc(doc1);
  index.addDoc(doc2);

  //   index = FlexSearch.create();
  const workspacePath = vscode.workspace.rootPath;

  const files = await lsR(workspacePath).catch(console.error);
  console.log("files", files);
};
export const searchFiles = async () => {
  if (!index) console.log("index not defined");
  const res = index.search("Oracle database profit");
  console.log(res);
};

const ls = async (path: string) => {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if (error) reject(error);
      resolve(files);
    });
  });
};

const lsR = async (targetPath: string) => {
  let currFiles = await ls(targetPath);
  console.log(currFiles);
  for (let f of currFiles) {
    const currFilePath = path.join(targetPath, f);
    if (fs.lstatSync(currFilePath).isDirectory() == true) {
      const newPath = path.join(targetPath, f);
      const moreFiles = await lsR(newPath);
      currFiles.concat(moreFiles);
    }
  }
  return currFiles;
};
