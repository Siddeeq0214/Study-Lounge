// NotebookPage.tsx
import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";
import Head from "next/head";
import Footer from "@/components/Footer";
import NoteSidebar from "@/content/Notebook/NoteSidebar";
import NoteMain from "@/content/Notebook/NoteMain";
import SidebarLayout from "@/layouts/SidebarLayout";
import useNotebook from "@/hooks/useNotebook";

function NotebookPage() {
  const { notes, createNote, deleteNote, updateNote } = useNotebook();
  const [activeNote, setActiveNote] = useState<string | null>(null);

  useEffect(() => {
    if (notes.length > 0 && !activeNote) {
      setActiveNote(notes[0]?.id); // Set the id of the first note as active initially
    }
  }, [notes, activeNote]);

  const handleAddNote = () => {
    createNote(); // Call createNote without passing any parameter to create an empty note
  };

  return (
    <>
      <Head>
        <title>Notebook</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth={false}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <NoteSidebar
                notes={notes}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onAddNote={handleAddNote} 
                onDeleteNote={deleteNote}
              />
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                {activeNote ? "Note" : "Create New Note"}
              </Typography>
              <NoteMain
                activeNote={notes.find((note) => note.id === activeNote) || null}
                onUpdateNote={(updatedNote) => {
                  if (activeNote) {
                    updateNote(activeNote, updatedNote);
                  } else {
                    createNote(); // Pass an empty note directly to createNote
                  }
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

NotebookPage.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default NotebookPage;
