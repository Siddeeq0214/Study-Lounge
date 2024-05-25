import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Note } from "@/atoms/noteAtom";

interface NoteSidebarProps {
  notes: Note[];
  onAddNote: () => void;
  onDeleteNote: (noteId: string) => void;
  activeNote: string | null;
  setActiveNote: (id: string | null) => void;
}

const NoteSidebar: React.FC<NoteSidebarProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const handleNoteClick = (id: string) => {
    setActiveNote(id === activeNote ? null : id);
  };

  const handleDeleteConfirmation = (id: string) => {
    setNoteToDelete(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (noteToDelete) {
      onDeleteNote(noteToDelete);
    }
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteCancelled = () => {
    setNoteToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Notes
      </Typography>
      <List>
        {notes.map(({ id, title, lastModified }) => (
          <React.Fragment key={id}>
            <ListItem
              button
              selected={id === activeNote}
              onClick={() => handleNoteClick(id)}
            >
              <ListItemText
                primary={title}
                secondary={new Date(lastModified).toLocaleString()}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteConfirmation(id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
      <Button variant="outlined" onClick={onAddNote}>
        Add Note
      </Button>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteCancelled}
        aria-labelledby="delete-confirmation-dialog"
      >
        <DialogTitle id="delete-confirmation-dialog">
          Are you sure you want to delete this note?
        </DialogTitle>
        <DialogContent>
          <Typography>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancelled}>Cancel</Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NoteSidebar;
