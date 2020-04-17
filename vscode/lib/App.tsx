import * as React from "react";
import * as ReactDOM from "react-dom";

console.log("loaded react!");
const App = () => {
  return <div>Hello from react</div>;
};

ReactDOM.render(<App />, document.getElementById("root"));
