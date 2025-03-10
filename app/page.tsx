// todo: display all notes, view selected note
// todo: ctrl + k to search notes, ctrl + i to add note, ctrl + d to delete note
import AuthProvider from "./account/AuthProvider";
import AddNote from "./components/AddNote";
import DisplayNotes from "./components/DisplayNotes";
import FileEditor from "./components/FileEditor";

export default function Home() {
  return (
    <AuthProvider>
      <FileEditor />
      <AddNote />
      <DisplayNotes />
    </AuthProvider>
  );
}
