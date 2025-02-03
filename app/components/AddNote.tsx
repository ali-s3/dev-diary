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
  const [content, setNote] = useState("");
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

  const validateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 0) {
      setTitleError("Title is required");
    } else {
      setTitleError("");
    }
  }

  const handleAddNote = async () => {
    if (title.length <= 0) {
      return;
    }
    addNote({
      title: title,
      content: content,
    });
  }



  return (
    <div className="sticky">
      <Popover onOpenChange={(open) => { console.log(open) }}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border border-primary rounded-2xl p-2 cursor-pointer w-full">
            New Note
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[96vw] border border-primary">
          <div className="flex flex-col gap-2">
            <Input
              className="border border-primary"
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => { validateTitle(e); setTitle(e.target.value) }}
            />
            <div className="text-red-500 text-sm">{titleError}</div>
            <Textarea
              className="h-60 border border-primary"
              placeholder="Type your message here."
              value={content}
              onChange={(e) => setNote(e.target.value)}
            />
            {/* todo: press enter to add note */}
            <Button
              variant="outline"
              className="border border-primary rounded-2xl cursor-pointer"
              onClick={handleAddNote}
              onKeyDown={(e) => {
                e.preventDefault();
                if (e.key === 'Enter')
                  handleAddNote();
              }}
            >Add Note</Button>
          </div>
        </PopoverContent>
      </Popover>

    </div>
  );
}