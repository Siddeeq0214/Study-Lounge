import { useState, useEffect } from "react";
import { auth, firestore } from "@/firebase/clientApp";
import { collection, doc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { Note, Note_CollectionName, generateNoteId } from "@/atoms/noteAtom";
import { StudentAppUser_CollectionName } from "@/atoms/studentAppUsersAtom";

const useNotebook = () => {
  const [authUser, authUserLoading, authUserError] = useAuthState(auth);
  const [notes, setNotes] = useState<Note[]>([]); // State to store notes

  useEffect(() => {
    if (!authUserLoading && authUser) {
      // Load notes for the current user
      listNotes();
    }
  }, [authUser, authUserLoading]);

  const createNote = async () => {
    try {
      const newNote: Note = {
        id: generateNoteId(),
        title: "",
        body: "", // Set body to empty for new notes
        lastModified: Date.now(),
        content: "", // Set content to empty for new notes
      };
      const noteRef = doc(
        firestore,
        `${StudentAppUser_CollectionName}/${authUser.uid}/${Note_CollectionName}`,
        newNote.id
      );
      await setDoc(noteRef, newNote);
      listNotes(); // Refresh notes after creating
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const listNotes = async () => {
    try {
      const notesRef = collection(
        firestore,
        `${StudentAppUser_CollectionName}/${authUser.uid}/${Note_CollectionName}`
      );
      const snapshot = await getDocs(notesRef);
      const loadedNotes: Note[] = [];
      snapshot.forEach((doc) => {
        const note = doc.data() as Note;
        loadedNotes.push(note);
      });
      setNotes(loadedNotes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const updateNote = async (noteId: string, updatedNote: Note) => {
    try {
      const noteIndex = notes.findIndex((note) => note.id === noteId);
      if (noteIndex !== -1) {
        const updatedNotes = [...notes];
        updatedNotes[noteIndex] = { ...updatedNote, lastModified: Date.now() };
        setNotes(updatedNotes);
        
        const noteRef = doc(
          firestore,
          `${StudentAppUser_CollectionName}/${authUser.uid}/${Note_CollectionName}`,
          noteId
        );
        await setDoc(noteRef, updatedNote, { merge: true });
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const deleteNote = async (noteId: string) => {
    try {
      const noteRef = doc(
        firestore,
        `${StudentAppUser_CollectionName}/${authUser.uid}/${Note_CollectionName}`,
        noteId
      );
      await deleteDoc(noteRef);
      listNotes(); // Refresh notes after deleting
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return {
    notes,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotebook;

