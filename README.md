# ZetCards

ZetCards is a flat file knowledge organization program built to last a lifetime. It is based on the ideas of [Luhmann's ZettleKasten method](https://medium.com/emvi/luhmanns-zettelkasten-a-productivity-tool-that-works-like-your-brain-abe2d53a2948) and the traditional wiki.

> **NOTE: UNRELEASED AND HIGHLY UNSTABLE**

## Principles

1. All data is stored as text files.
2. Minimal text formatting (markdown format).
3. No customized linking mechanism.
4. Store once, update occasionally, never organize.
5. Links, links, links!

## Features

- **Card Management**
  - [ ] Create new cards in an inbox folder [#4](https://github.com/Ziinc/ZetCards/issues/4)
  - [ ] Add file ids to filenames automatically [#2](https://github.com/Ziinc/ZetCards/issues/2)
  - [ ] Adjusting card's filename if the linked card's header 1/title changes [#5](https://github.com/Ziinc/ZetCards/issues/5)
  - [ ] Adjusting anchor text if linked card's filename changes
  - [ ] Automatically move files based on tags (if tagged, moves from inbox to index)
    - (future) hierarchical tags, for subfolders
  - (future) Card filepicker search based on content/relevance
    - https://github.com/gayanhewa/vscode-fuzzysearch
  - (future) Able to expand a hierarchy of card links
    - Use case e.g. combining a collection of cards into a draft document for an article.
  - (future) asset pasting
  - (ftuure) dead assets (assets without any inbound links) identification, purging.
- **Link management**
  - [ ] Searching for cards based on filename/header/yaml title/subheaders/content when creating links, automatically creating links when selected
  - (future) wiki-style fast linking for creating links between cards
  - (future) Automatically linting dead relative links in cards
  - (future) Automatically adjusting relative links when files are moved, keeping relative links in sync
- **Cards Analysis**
  - [ ] Can see a card's inbound and outbound links **(#3)**
    - (future) network node graph
  - (future) Smarter searching/linking based on card content relevance
  - (future) Card Preview
    - Can preview cards in side panel just by focusing on links
      - Use cases:
        - searching for possible links (link management)
  - (future) Community building
    - Getting advice from peers to organize/condense a zet card

## Developer

```bash
# install dependencies
$ (cd core; npm i)
$ (cd vscode; npm i)

# run tests
$ (cd core; npm test)
$ (cd vscode; npm test)
```

State management is performed using in-memory sqlite (with sql.js). Get and Set functions are used for allowing the UI to observe state changes.

Development philosophy is as follows:

- Minmal dependencies
- Thin platform-specific wrapper around core functionalities
- Core is platform agnostic

## License

ZetCards software is licensed with GNU GPL v3.

This means that:

- You can build, verify, test, and share ZetCards freely.
- You cannot create and distribute a non-free proprietary improvement on the program and compete against ZetCards.

The ZetCards-related creative works like branding, websites, documentation are copyrighted, with all rights reserved.
