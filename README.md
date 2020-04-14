# ZetCards

ZetCards is a knowledge organization program built to last a lifetime. It is based on the ideas of [Luhmann's ZettleKasten method](https://medium.com/emvi/luhmanns-zettelkasten-a-productivity-tool-that-works-like-your-brain-abe2d53a2948) and the traditional wiki.

- [ ] VSCode extension

## Development Notes

The main architectural considerations are as follows:

- Core of the application is shared as much as possible
- Core is platform agnostic
- Thin platform-specific wrapper around core functionalities

### Experimental WASM usage

Core functions are written in rust and used in the extension through wasm.

```bash
# to run

# build wasm package, outs to /zet/rs/pkg
(cd zet/rs;  wasm-pack build --target nodejs )

# build extension, outs to /zet/out
(cd zet; npm run compile)
```

### Todos

- [ ] reading files, using vscode

  - https://github.com/rustwasm/wasm-bindgen/issues/1727
  - https://stackoverflow.com/questions/38782181/read-and-write-file-using-vs-code-extension

- [ ] organize files such that high level interactions (e.g. getting files from vscode) are separated from optimized wasm/rust functions (e.g. string manipulation).
- [ ] Use nodejs bindings for sqlite3, for in-memory database use.
  - [ ] may be used in wasm directly? https://rustwasm.github.io/book/reference/js-ffi.html
- [ ] prototype in pure ts first.

Notes: will need to bridge core code, wasm interface, and vscode/ts interface.

---

# Welcome to your VS Code Extension

## What's in the folder

- This folder contains all of the files necessary for your extension.
- `package.json` - this is the manifest file in which you declare your extension and command.
  - The sample plugin registers a command and defines its title and command name. With this information VS Code can show the command in the command palette. It doesn’t yet need to load the plugin.
- `src/extension.ts` - this is the main file where you will provide the implementation of your command.
  - The file exports one function, `activate`, which is called the very first time your extension is activated (in this case by executing the command). Inside the `activate` function we call `registerCommand`.
  - We pass the function containing the implementation of the command as the second parameter to `registerCommand`.

## Get up and running straight away

- Press `F5` to open a new window with your extension loaded.
- Run your command from the command palette by pressing (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac) and typing `Hello World`.
- Set breakpoints in your code inside `src/extension.ts` to debug your extension.
- Find output from your extension in the debug console.

## Make changes

- You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
- You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Explore the API

- You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.

## Run tests

- Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
- Press `F5` to run the tests in a new window with your extension loaded.
- See the output of the test result in the debug console.
- Make changes to `src/test/suite/extension.test.ts` or create new test files inside the `test/suite` folder.
  - The provided test runner will only consider files matching the name pattern `**.test.ts`.
  - You can create folders inside the `test` folder to structure your tests any way you want.

## Go further

- Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
- [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VSCode extension marketplace.
- Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).

## License

ZetCards client software is licensed with GNU GPL v3.

The ZetCards-related creative works like branding are copyrighted, with all rights reserved.
