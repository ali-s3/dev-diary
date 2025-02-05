// todo: display notes via SWR 
"use client";
import { useEffect, useState } from "react";
import { getNotes } from "../utils/storage/notes";
import { Note } from "@/types/globals";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import DeleteNote from "./DeleteNote";

export default function DisplayNotes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<Boolean>(true);

    // the best way to refresh note fethcing is to use SWR
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notesData = await getNotes();
                setNotes(notesData);
            } catch (error) {
                console.error("Error fetching notes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotes();
    }, []);

    if (loading) return <h3> Loading ...</h3>;

    return (
        <div>
            {notes.map((note) => (
                <div key={note.id} className="flex items-center gap-2">
                    <div className="grow p-2 my-12">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value={note.id}>
                                <AccordionTrigger>{note.title}</AccordionTrigger>
                                <AccordionContent>
                                    {note.content}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="shrink">
                        <DeleteNote note={note} />
                    </div>
                </div>
            ))}
        </div>
    )
}
