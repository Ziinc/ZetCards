import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import { describe, it } from "mocha";
import * as vscode from "vscode";

describe("How to create notes", () => {
  it("Create a new note manually");
  it("Create a new note from a link");
});

describe("How to link notes", () => {
  it("Creating outbound links through link searching");
});

describe("How to search for related notes", () => {
  it("searching through the notes browser");
  it("searching for notes when creating links");
});

describe("How to analyze inbound/outbound links", () => {
  it("through knowledge graph viewer");
});
