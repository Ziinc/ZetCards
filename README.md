# ZetCards

ZetCards is a knowledge organization program built to last a lifetime. It is based on the ideas of [Luhmann's ZettleKasten method](https://medium.com/emvi/luhmanns-zettelkasten-a-productivity-tool-that-works-like-your-brain-abe2d53a2948) and the traditional wiki.

End Goals:

- [ ] VSCode extension
- Have a FOSS core
- Peripheral services priced as per month services for maintenance, upkeep
  - srs applications integrations (anki/mochi)
  - references management (zotero)
  - academic paper output (latex)
  - mobile/web support, possible SaaS
  - website building support

## Ideal Workflow

### Creating notes

Integrate with GitJournal

## Things the software should handle

- Note search
  - [ ] Filepicker search based on content/relevance
    - https://github.com/gayanhewa/vscode-fuzzysearch
- Note Management
  - [ ] Create new notes in an inbox folder
  - [ ] Add file ids to filenames automatically.
  - [ ] Adjusting note's filename if the linked note's header 1/title changes
  - [ ] Adjusting anchor text if linked note's filename changes
  - [ ] Automatically move files based on tags
    - [ ] hierarchical tags, for subfolders
  - [ ] Able to expand a hierarchy of note links
    - Use case e.g.
      - combining a collection of notes into a draft document for an article.
- Link management
  - [ ] wiki-style fast linking for creating links between notes
  - [ ] Searching for notes based on filename/header/yaml title/subheaders/content, automatically creating links when selected
  - [ ] Automatically adjusting relative links when files are moved, keeping relative links in sync
  - [ ] Automatically linting dead relative links in notes
- Notes Analysis
  - [ ] Can see a note's inbound links
    - [x] Store
    - [ ] Display
- Future
  - Note search/smart linking based on relevance
  - Note Preview
    - Can preview notes in side panel just by focusing on links
      - Use cases:
        - searching for possible links (link management)
      - ![Example UI inspiration](/assets/2020/04/08-02-21-1586283681424.png)
  - Community building
    - Getting advice from peers to organize/condense a zet note

### Todos

- [ ] reading files, using vscode

  - https://github.com/rustwasm/wasm-bindgen/issues/1727
  - https://stackoverflow.com/questions/38782181/read-and-write-file-using-vs-code-extension

- [ ] organize files such that high level interactions (e.g. getting files from vscode) are separated from optimized wasm/rust functions (e.g. string manipulation).
- [ ] Use nodejs bindings for sqlite3, for in-memory database use.
  - [ ] may be used in wasm directly? https://rustwasm.github.io/book/reference/js-ffi.html
- [ ] prototype in pure ts first.

Notes: will need to bridge core code, wasm interface, and vscode/ts interface.

## Development Notes

The main architectural considerations are as follows:

- Core of the application is shared as much as possible
- Core is platform agnostic
- Thin platform-specific wrapper around core functionalities

<details>
  <summary>VSCode ext dev readme</summary>
  
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

</details>

## License

ZetCards software is licensed with GNU GPL v3.

This means that:

- You can build, verify, test, and share ZetCards freely.
- You cannot create a non-free proprietary improvement on the program and compete against ZetCards.

The ZetCards-related creative works like branding, websites, documentation are copyrighted, with all rights reserved.
