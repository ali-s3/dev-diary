"use client";
import { Textarea } from "./ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/utils/firebaseConfig";

export default function AddNote() {
  const [note, setNote] = useState("");

  const handleAddNote = async () => {
    
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <h3>Add Note</h3>
        </PopoverTrigger>
        <PopoverContent>
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