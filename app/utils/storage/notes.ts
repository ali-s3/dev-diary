// todo: display all notes, view selected note
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";
import { Note } from "@/types/globals";

const addNote = async (note: { title: string, content: string }) => {
    try {
        await addDoc(collection(db, "notes"), {
            note: note,
        });
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const getNotes = async (): Promise<Note[]> => {
    const querySnapshot = await getDocs(collection(db, "notes"));
    return querySnapshot.docs.map((doc) => {
        return {
            id: doc.id,
            title: doc.data().note.title,
            content: doc.data().note.content,
        };
    });
}

export const deleteNote = async (id: string): Promise<string> =>
    deleteDoc(doc(db, "notes", id))
        .then(() => Promise.resolve("Document successfully deleted!"))
        .catch((error) => Promise.reject(`Error deleting document! ${error}`));


export { addNote, getNotes };