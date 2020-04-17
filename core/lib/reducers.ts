import { combineReducers } from "redux";
import notesSlice from "./features/notes/notesSlice";

export default combineReducers({
  notes: notesSlice
});
