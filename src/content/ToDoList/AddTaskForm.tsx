// AddTaskForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import { Task } from '@/atoms/taskAtom';

interface AddTaskFormProps {
  onAdd: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      onAdd({
        title: taskTitle,
        description: taskDescription,
        id: '',
        completed: false
      });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Task Title"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Task Description"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          Add Task
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddTaskForm;