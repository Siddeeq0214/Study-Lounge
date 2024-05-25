// NoteMain.tsx
import React, { ChangeEvent, useCallback, useRef } from "react";
import { Note } from "@/atoms/noteAtom";
import { TextField, Grid } from "@mui/material";

interface NoteMainProps {
  activeNote: Note | string | null; // Adjusted type definition
  onUpdateNote: (updatedNote: Note) => void;
}

const NoteMain: React.FC<NoteMainProps> = ({ activeNote, onUpdateNote }) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLTextAreaElement | null>(null);

  const onEditField = useCallback(
    (field: keyof Note, value: string) => {
      if (!activeNote || typeof activeNote === "string") return;
      
      onUpdateNote({
        ...activeNote,
        [field]: value,
        lastModified: Date.now(),
      });
    },
    [activeNote, onUpdateNote]
  );

  if (!activeNote) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          fullWidth
          inputRef={titleRef}
          value={typeof activeNote !== "string" ? activeNote.title : ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onEditField("title", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={30} // Adjusted number of rows
          variant="outlined"
          fullWidth
          inputRef={bodyRef}
          value={typeof activeNote !== "string" ? activeNote.body : ""}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onEditField("body", e.target.value)
          }
        />
      </Grid>
    </Grid>
  );
};

export default NoteMain;
