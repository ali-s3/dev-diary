import { Button } from "./ui/button";
import { Note } from "@/types/globals";
import { useState } from "react";
import { deleteNote } from "../utils/storage/notes";
export default function DeleteNote({ note }: { note: Note }) {
    const [deleteLoading, setDeleteLoading] = useState<Boolean>(false);
    const handleDeleteNote = async () => {
        // console.log("delete note: ", note.id);
        setDeleteLoading(true);
        try {
            const response = await deleteNote(note.id);
            console.log(response);
        } catch (e) {
            console.error(e);
        } finally {
            setDeleteLoading(false);
        }
    }
    return (
        <div>
            <Button
                variant={"destructive"}
                onClick={() => handleDeleteNote()}
            >Delete</Button>
        </div>
    )
}