import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

interface DeleteButtonProps {
  onDelete: () => void | Promise<void>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };

  return (
      <>
        <Button variant="contained" color="error" onClick={() => setOpen(true)}>
          Delete
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} variant="contained" color="error">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
};

export default DeleteButton;
