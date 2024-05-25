import React, { useState } from 'react';
import { ListItem, ListItemText, Checkbox, ListItemSecondaryAction, IconButton, Box, LinearProgress, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, List, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useTask from '@/hooks/useTaskManager';
import { Task } from '@/atoms/taskAtom';

interface TaskListItemProps {
  task: Task;
  onDelete: () => void;
  onUpdate: (updatedTask: Task) => void;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ title: task.title, description: task.description });
  const [isChecked, setIsChecked] = useState(task.completed);
  const { deleteTask } = useTask();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    onUpdate({ ...task, ...editedTask });
    setIsEditing(false);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onUpdate({ ...task, completed: event.target.checked });
  };

  return (
    <Paper elevation={3} sx={{ padding: '12px', marginBottom: '16px', borderRadius: '8px', position: 'relative' }}>
      <ListItem disablePadding>
        <Checkbox
          checked={isChecked}
          onChange={handleCheckboxChange}
          color="primary"
          sx={{ marginRight: '12px' }}
        />
        {isEditing ? (
          <ListItemText
            primary={
              <>
                <TextField
                  fullWidth
                  value={editedTask.title}
                  onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                  autoFocus
                  variant="standard"
                  label="Title"
                  InputProps={{ disableUnderline: true }}
                  sx={{ fontSize: '16px', fontWeight: 500, textDecoration: isChecked ? 'line-through' : 'none', marginBottom: 1 }}
                />
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  variant="standard"
                  label="Description"
                  InputProps={{ disableUnderline: true }}
                  sx={{ fontSize: '14px', color: '#666' }}
                />
              </>
            }
            sx={{ flex: '1' }}
          />
        ) : (
          <ListItemText
            primary={
              <span style={{ fontSize: '16px', fontWeight: 500, textDecoration: isChecked ? 'line-through' : 'none' }}>{task.title}</span>
            }
          />
        )}
        <ListItemSecondaryAction>
          {isEditing ? (
            <IconButton aria-label="done" onClick={handleUpdate} sx={{ marginRight: '8px' }}>
              <DoneIcon />
            </IconButton>
          ) : (
            <IconButton aria-label="edit" onClick={handleEdit} sx={{ marginRight: '8px' }}>
              <EditIcon />
            </IconButton>
          )}
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ border: '1px solid #ccc', padding: '8px', borderRadius: '4px' }}>
            <List>
              {task.description.split('\n').map((line, index) => (
                <ListItemText key={index} primary={line} />
              ))}
            </List>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box sx={{ position: 'absolute', bottom: '-12px', left: '0', right: '0' }}>
        <LinearProgress
          variant="determinate"
          value={isChecked ? 100 : 0}
          sx={{
            borderRadius: '4px',
            height: '6px',
            '& .MuiLinearProgress-bar': {
              borderRadius: '4px',
              backgroundColor: '#4CAF50', // Change color to green
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default TaskListItem;
