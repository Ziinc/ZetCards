// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { buildSearchIndex, searchFiles } from "./core";
// this method is called when your extension is activated
// your extension is activated the very first time the command is execu[t]ed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  buildSearchIndex();
  const selector = "*";
  const completionItemProviderDisposable = vscode.languages.registerCompletionItemProvider(
    selector,
    {
      provideCompletionItems(document, position, token, context) {
        const items = [];
        searchFiles();
        for (let tag of ["test", "testing123"]) {
          items.push(new vscode.CompletionItem(tag));
        }
        console.log(items);

        return items;
      }
    },
    "[["
  );

  // const documentLinkProvider = new HashtagsDocumentLinkProvider();
  // const documentLinkProviderDisposable = vscode.languages.registerDocumentLinkProvider(
  //   selector,
  //   documentLinkProvider
  // );

  context.subscriptions.push(completionItemProviderDisposable);
  // context.subscriptions.push(documentLinkProviderDisposable);

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
