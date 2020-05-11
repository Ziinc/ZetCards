import * as vscode from "vscode";
const fs = require("fs");
var elasticlunr = require("elasticlunr");
const path = require("path");
import * as glob from "glob";
let index;

const newId = () => new Date().valueOf();
const getIdFromString = (toSearch: string) => toSearch.match(/^(\d{13})/g);
const checkFormat = (toCheck: string) => {
  const pattern = RegExp("^(\\d{13})-(.+)", "g");
  return pattern.test(toCheck);
};
export const utils = {
  newId,
  getIdFromString,
  checkFormat
};

export const buildSearchIndex = async () => {
  if (index) return;
  index = elasticlunr(function() {
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

export const lsR = async (
  targetPath: string,
  opts = { exclude: [".git"], filter: undefined }
) => {
  const excludedPaths = opts.exclude.map(p => path.join(targetPath, p));
  let currFiles = await ls(targetPath);
  for (let f of currFiles) {
    const currFilePath = path.join(targetPath, f);

    if (
      fs.lstatSync(currFilePath).isDirectory() == true &&
      !excludedPaths.includes(currFilePath)
    ) {
      const newPath = path.join(targetPath, f);
      const moreFiles = await lsR(newPath);
      currFiles.concat(moreFiles);
    }
  }
  return currFiles;
};

export default {
  async refreshCards() {
    const workspacePath = vscode.workspace.rootPath;
    let cards = [];
    glob("**/**.md", { cwd: workspacePath }, (err, files) => {
      // Add files to the test suite
      // const filePath = path.resolve(workspacePath, f);
      console.log(files);
      // cards.push({
      //   id: "something",
      //   parentDir: "something",
      //   filename: "something",
      //   content: "something"
      // });
    });

    // list all files
    // read file contents
    // return as cards

    return [];
  }
};
