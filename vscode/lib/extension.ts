import * as vscode from "vscode";
import * as path from "path";
import { store } from "core";

export function activate(context: vscode.ExtensionContext) {
  const extensionPath = context.extensionPath;
  const selector = "*";
  const completionItemProviderDisposable = vscode.languages.registerCompletionItemProvider(
    selector,
    {
      provideCompletionItems(document, position, token, context) {
        const items = [];
        for (let tag of ["test", "testing123"]) {
          items.push(new vscode.CompletionItem(tag));
        }
        console.log(items);

        return items;
      }
    },
    "[["
  );

  context.subscriptions.push(completionItemProviderDisposable);

  context.subscriptions.push(
    vscode.commands.registerCommand("zetcards.openCardPanel", () => {
      // The code you place here will be executed every time your command is executed
      let panel = vscode.window.createWebviewPanel(
        "cardPanel",
        "ZetCards Dashboard",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(extensionPath, "dist")),
            vscode.Uri.file(path.join(extensionPath, "static"))
          ]
        }
      );

      // pass app state to html renderer on state change
      // https://stackoverflow.com/questions/1759987/listening-for-variable-changes-in-javascript
      function refreshHtml() {
        // const appState
      }
      console.log(store.getState());
      panel.webview.html = getWebviewContent(panel.webview, extensionPath);
      // Listen for when the panel is disposed
      // This happens when the user closes the panel or when the panel is closed programatically
      panel.onDidDispose(() => this.dispose(), null, this._disposables);
      panel.onDidDispose(
        () => {
          panel = undefined;
        },
        undefined,
        context.subscriptions
      );
    })
  );
}

function getWebviewContent(webview: vscode.Webview, extensionPath) {
  // Local path to main script run in the webview
  const scriptPathOnDisk = vscode.Uri.file(
    path.join(extensionPath, "dist", "webview.js")
  );

  // And the uri we use to load this script in the webview
  const scriptUri = webview.asWebviewUri(scriptPathOnDisk);

  const stylePathOnDisk = vscode.Uri.file(
    path.join(extensionPath, "dist", "main.css")
  );
  const styleUri = stylePathOnDisk.with({ scheme: "vscode-resource" });

  // Use a nonce to whitelist which scripts can be run
  const nonce = getNonce();

  return `<!DOCTYPE html>
		  <html lang="en">
        <head>
            <meta charset="UTF-8">
            <!--
            Use a content security policy to only allow loading images from https or from our extension directory,
            and only allow scripts that have a specific nonce.
            -->
            <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource} https:; script-src 'nonce-${nonce}';">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cat Coding</title>
        </head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <div id="root"></div>
          
          <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>`;
}
function getNonce() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// this method is called when your extension is deactivated
export function deactivate() {}
