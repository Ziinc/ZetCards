# ZetCards

ZetCards is a flat file knowledge organization program built to last a lifetime. It is based on the ideas of [Luhmann's ZettleKasten method](https://medium.com/emvi/luhmanns-zettelkasten-a-productivity-tool-that-works-like-your-brain-abe2d53a2948) and the traditional wiki.

End Goals:

- [ ] VSCode extension
- Peripheral services priced as per month services for maintenance, upkeep
  - srs applications integrations (anki/mochi)
  - references management (zotero)
  - academic paper output (latex)
  - mobile/web support, possible SaaS
  - website building support

## Features

## Roadmap

- [ ] Card filepicker search based on content/relevance
  - https://github.com/gayanhewa/vscode-fuzzysearch
- Card Management
  - [ ] Create new cards in an inbox folder
  - [ ] Add file ids to filenames automatically.
  - [ ] Adjusting card's filename if the linked card's header 1/title changes
  - [ ] Adjusting anchor text if linked card's filename changes
  - [ ] Automatically move files based on tags
    - [ ] hierarchical tags, for subfolders
  - [ ] Able to expand a hierarchy of card links
    - Use case e.g.
      - combining a collection of cards into a draft document for an article.
- Link management
  - [ ] wiki-style fast linking for creating links between cards
  - [ ] Searching for cards based on filename/header/yaml title/subheaders/content, automatically creating links when selected
  - [ ] Automatically adjusting relative links when files are moved, keeping relative links in sync
  - [ ] Automatically linting dead relative links in cards
- Cards Analysis
  - [ ] Can see a card's inbound links
    - [x] Store
    - [ ] Display
  - Card search/smart linking based on relevance
  - Card Preview
    - Can preview cards in side panel just by focusing on links
      - Use cases:
        - searching for possible links (link management)
      - ![Example UI inspiration](/assets/2020/04/08-02-21-1586283681424.png)
  - Community building
    - Getting advice from peers to organize/condense a zet card

* [ ] reading files, using vscode

  - https://stackoverflow.com/questions/38782181/read-and-write-file-using-vs-code-extension

## Development Cards

The main architectural considerations are as follows:

- Core of the application is shared as much as possible
  - Prototype and test with TS, refactor for speed with rust wasm.
  - State management with sql.js
- Core is platform agnostic
- Thin platform-specific wrapper around core functionalities

### Issue Tracker

All issues are tracked with [git-bug](https://github.com/MichaelMure/git-bug), synced with Github.

## License

ZetCards software is licensed with GNU GPL v3.

This means that:

- You can build, verify, test, and share ZetCards freely.
- You cannot create and distribute a non-free proprietary improvement on the program and compete against ZetCards.

The ZetCards-related creative works like branding, websites, documentation are copyrighted, with all rights reserved.
