import * as React from "react";
import { useEffect, createContext, useContext, useState } from "react";
import * as ReactDOM from "react-dom";
import { State } from "core";

const AppContext = createContext({});
const useAppState = () => useContext(AppContext);

// https://stackoverflow.com/questions/56237448/how-to-make-acquirevscodeapi-available-in-vscode-webview-react
interface vscode {
  postMessage(message: any): void;
}
declare const vscode: vscode;

const handlers = {
  callback(category: string) {
    vscode.postMessage({ command: "add", data: category });
  },
};
const App = () => {
  const [localState, setLocalState] = useState({});
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const state: State = event.data; // The JSON data our extension sent
      setLocalState(state);
    });
  }, []);
  return (
    <AppContext.Provider value={[localState, handlers]}>
      {/* pretty print state for debugging/prototying */}
      {localState && JSON.stringify(localState, null, 2)}
    </AppContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
