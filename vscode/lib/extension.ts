import * as vscode from "vscode";
import * as path from "path";
import deps from "./deps";
import Core, { State } from "core";
// push state to webview

export async function activate(context: vscode.ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  const pushState = (state: State) => {
    if (!currentPanel) return;
    currentPanel.webview.postMessage(state);
  };
  // console.log("ran");
  // let core = Core.init({
  //   ...
  // }).then(core => {
  //   const cards = core.cards.listCards();
  //   console.log(cards);
  // });
  const extensionPath = context.extensionPath;

  context.subscriptions.push(
    vscode.commands.registerCommand("zetcards.openCardPanel", () => {
      // The code you place here will be executed every time your command is executed
      if (currentPanel) {
        currentPanel.reveal(vscode.ViewColumn.One);
        return;
      } else {
        // create new panel
        currentPanel = vscode.window.createWebviewPanel(
          "cardPanel",
          "ZetCards Dashboard",
          vscode.ViewColumn.One,
          {
            enableScripts: true,
            localResourceRoots: [
              vscode.Uri.file(path.join(extensionPath, "dist")),
              vscode.Uri.file(path.join(extensionPath, "static")),
            ],
          }
        );
        currentPanel.webview.html = getWebviewContent(
          currentPanel.webview,
          extensionPath
        );
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        currentPanel.onDidDispose(
          () => this.dispose(),
          null,
          this._disposables
        );
        currentPanel.onDidDispose(
          () => {
            currentPanel = undefined;
          },
          undefined,
          context.subscriptions
        );
      }
      currentPanel.webview.onDidReceiveMessage(
        (message) => {
          const command = message.command;
          const callbacks = {
            add() {
              console.log("testing message passing");
            },
          };
          const callback = callbacks[command] || null;

          if (callback) {
            callback(message.data);
          }
          return;
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
        <script  nonce="${nonce}">
          const vscode = acquireVsCodeApi();
        </script>
          
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
