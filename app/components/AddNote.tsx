"use client";
import { Textarea } from "./ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";
import { addNote } from "../utils/storage/notes";

export default function AddNote() {
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  const handleAddNote = async () => {
    const noteObj = {
      title: title,
      content: note,
    };
    addNote(noteObj);
  }
  
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <h3>Add Note</h3>
        </PopoverTrigger>
        <PopoverContent>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Type your message here."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            variant="outline"
            onClick={handleAddNote}
          >Add Note</Button>
        </PopoverContent>
      </Popover>

    </div>
  );
}