// import * as assert from "assert";

// describe("backlinks", function() {
//   it("parses a list of notes, extracts inbound and outbound links", function() {
//     const inputNotes = [
//       {
//         id: "1",
//         parentDir: "/notes",
//         filename: "my_random_note.md",
//         content: "Some markdown content"
//       },
//       {
//         id: "2",
//         parentDir: "/notes",
//         filename: "same_dir.md",
//         content:
//           "[test](./my_random_note.md), [no rel link](my_random_note.md), [no ext](my_random_note)"
//       }
//     ];

//     const newState = notesReducer(
//       {
//         deps: { fetchNotes: () => inputNotes },
//         notes: []
//       },
//       {
//         type: refreshNotes.type
//       }
//     );
//     const { notes } = newState;

//     const noteWithOutbound = notes.find(n => n.id == "2");
//     assert.equal(noteWithOutbound.outboundNotes["1"].length, 3);
//     assert.deepEqual(noteWithOutbound.inboundNotes, {}, "note wtih outbound");

//     const noteWithInbound = notes.find(n => n.id == "1");
//     assert.equal(noteWithInbound.inboundNotes["2"].length, 3);
//     assert.deepEqual(noteWithInbound.outboundNotes, {}, "note with inbound");
//   });
// });
