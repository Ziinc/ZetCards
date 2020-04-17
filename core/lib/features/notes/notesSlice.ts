import { createSlice, createReducer, createAction } from "@reduxjs/toolkit";
import * as url from "url";
import * as path from "path";
type Note = {
  id: string;
  parentDir: string;
  filename: string;
  content: string;
  title?: string;
  rootFilePath?: string;
  inboundNotes?: {
    [id: string]: NoteLink[];
  };
  outboundNotes?: {
    [id: string]: NoteLink[];
  };
};

type NoteLink = {
  toNoteId: string;
  altText: string;
  rootFilePath: string;
};
type MdLink = {
  altText: string;
  to: string;
};
type SliceState = {
  deps: {
    fetchNotes: () => Note[];
  };
  notes: Note[];
};

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    deps: null,
    notes: []
  } as SliceState,
  reducers: {
    injectDeps(state, action) {
      state.deps = action.payload;
    },
    refreshNotes(state) {
      // refresh backlink state
      if (!state.deps.fetchNotes) {
        console.error("[error]", "fetchNotes dependency needs to be injected.");
        return;
      }

      const unprocessed = state.deps.fetchNotes().map(n => {
        let rootFilePath = path.resolve(
          n.parentDir,
          path.basename(n.filename, ".md")
        );
        return { ...n, rootFilePath, inboundNotes: {}, outboundNotes: {} };
      });
      const withOutbound: Note[] = unprocessed.map((note: Note) => {
        // populate outbound links
        const outboundMdLinks = extractMdLinks(note.content);
        const outboundNoteLinks = convertMdLinksToNoteLinks(
          note,
          outboundMdLinks,
          unprocessed
        ).reduce((acc, noteLink: NoteLink) => {
          let prev = acc[noteLink.toNoteId] || [];
          prev.push(noteLink);
          acc[noteLink.toNoteId] = prev;
          return acc;
        }, {});

        return { ...note, outboundNotes: outboundNoteLinks };
      });

      const withInbound = withOutbound.reduce(
        (acc, note: Note) => {
          // create inbound note links
          const noteIdsToUpdate = Object.keys(note.outboundNotes);
          noteIdsToUpdate.forEach(id => {
            const index = acc.findIndex(n => n.id === id);
            if (index !== -1) {
              const prevNoteToUpdate = acc[index];
              const newInboundNotes = {
                ...prevNoteToUpdate.inboundNotes,
                [note.id]: note.outboundNotes[id].concat(
                  prevNoteToUpdate.inboundNotes[note.id] || []
                )
              };

              acc[index] = { ...acc[index], inboundNotes: newInboundNotes };
            }
          });
          return acc;
        },
        [...withOutbound]
      );
      state.notes = withInbound;
    }
  }
});

const convertMdLinksToNoteLinks = (
  note: Note,
  links: MdLink[],
  notes: Note[]
): NoteLink[] => {
  const noteLinks = links.reduce((acc, link) => {
    const resolvedLink = path.resolve(note.parentDir, link.to);
    let parsed = path.parse(resolvedLink);
    parsed.base = path.basename(resolvedLink, ".md");
    const linkedNote = notes.find(n => n.rootFilePath == path.format(parsed));
    if (linkedNote) {
      acc.push({
        toNoteId: linkedNote.id,
        altText: link.altText,
        rootFilePath: resolvedLink
      });
    }
    return acc;
  }, []);

  return noteLinks;
};

const extractMdLinks = (content): MdLink[] => {
  // Are there links?
  // grp 0 : full markdown match
  // grp 1: alt text or reference id
  // grp 2: unresolved link
  let links = [];
  let match;
  const inlineRegexp = /\[([^\[]+)\]\(([^\)]+\w*)\)/g;
  const referenceRegexp = /\[([a-zA-z0-9_-]+)\]:\s*(\S+)/g;
  [inlineRegexp, referenceRegexp].forEach(regexp => {
    while ((match = regexp.exec(content))) {
      links.push({
        altText: match[1],
        to: match[2]
      });
    }
  });

  return links;
};

export const { injectDeps, refreshNotes } = notesSlice.actions;

export default notesSlice.reducer;
