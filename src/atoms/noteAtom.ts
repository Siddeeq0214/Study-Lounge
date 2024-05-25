// noteAtom.ts
import { atom } from "recoil";

export const Note_CollectionName = "notes"; // Define collection name for notes

export interface Note {
  id: string; // Ensure ID is always present and must be a string
  title: string;
  body: string;
  lastModified: number; // Updated to match the last modified timestamp
  content: string; // Add the content property
}

// Atom for managing notes collection
export const noteCollectionAtom = atom<Note[]>({
  key: "noteCollectionAtom",
  default: [], // Default empty collection
});

// Utility function to generate unique ID for notes
export const generateNoteId = (): string => {
  return Math.random().toString(36).substr(2, 9); // Generate a random alphanumeric string
};
