// todo: note object
// todo: add note to firestore
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";

const addNote = async (note: { title: string; content: string }) => {
    try {
        const docRef = await addDoc(collection(db, "notes"), {
            note: note,
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

export { addNote };