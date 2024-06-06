// NoteMain.tsx
import React, { ChangeEvent, useCallback, useRef } from "react";
import { Note } from "@/atoms/noteAtom";
import { TextField, Grid, Button } from "@mui/material";
import jsPDF from "jspdf";

interface NoteMainProps {
  activeNote: Note  | null; // Adjusted type definition
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

  const handleDownloadPDF = () => {
    if (!activeNote) return;

    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text(activeNote.title, 10, 10);
    doc.setFontSize(12);
    doc.text(activeNote.body, 10, 20);
    doc.save(`${activeNote.title || "note"}.pdf`);
  };

  const handleDownloadText = () => {
    if (!activeNote) return;

    const noteContent = `Title: ${activeNote.title}\n\n${activeNote.body}`;
    const blob = new Blob([noteContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNote.title || "note"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  if (!activeNote) return null;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Title"
          fullWidth
          inputRef={titleRef}
          value={activeNote.title}
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
          value={activeNote.body}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            onEditField("body", e.target.value)
          }
        />
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
            Download Note as PDF
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleDownloadText}>
            Download Note as Text
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoteMain;
