import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Box, Paper, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import useTask from '@/hooks/useTaskManager'; // Update the path as per your project structure
import TaskList from '@/content/ToDoList/TaskList';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

const TodoPage: React.FC = () => {
  const { tasks, addTask, deleteTask, updateTask } = useTask(); // Updated hook name
  const [completedTasks, setCompletedTasks] = useState<number>(0);
  const [inProgressTasks, setInProgressTasks] = useState<number>(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState<boolean>(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string>('');


  useEffect(() => {
    // Calculate completed and in progress tasks
    const completedCount = tasks.filter(task => task.completed).length;
    setCompletedTasks(completedCount);
    setInProgressTasks(tasks.length - completedCount);
  }, [tasks]);

  const handleAddTask = () => {
    if (taskTitle.trim() !== '') {
      addTask({
        title: taskTitle,
        description: taskDescription,
        id: '',
        completed: false
      });
      setTaskTitle('');
      setTaskDescription('');
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setDeleteTaskId(taskId);
    setDeleteConfirmationOpen(true);
  };

  const confirmDeleteTask = () => {
    deleteTask(deleteTaskId);
    setDeleteConfirmationOpen(false);
  };

  const cancelDeleteTask = () => {
    setDeleteConfirmationOpen(false);
  };

  return (
    <>
      <Head>
        <title>Study Goals</title>
      </Head>
      <SidebarLayout>
        <Container maxWidth="xl" sx={{ marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Add Task
                </Typography>
                <TextField
                  fullWidth
                  label="Task Title"
                  variant="outlined"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  sx={{ marginBottom: 2 }}
                />
                <TextField
                  fullWidth
                  label="Task Description"
                  variant="outlined"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  multiline
                  rows={6} // Adjusted rows to make it slightly bigger
                  sx={{ marginBottom: 2 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddTask}
                >
                  Add Task
                </Button>
              </Paper>
              <Paper elevation={3} sx={{ padding: 2, marginBottom: 3 }}>
                <Typography variant="body1" color="textSecondary" align="center" gutterBottom>
                  Total Tasks: {tasks.length} | Completed: {completedTasks} | In Progress: {inProgressTasks}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={8}> {/* Adjusted sm from 8 to 9 */}
              <Paper elevation={3} sx={{ padding: 3, marginBottom: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Task List
                </Typography>
                {tasks.length > 0 ? (
                  <TaskList
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                    onUpdateTask={updateTask}
                  />
                ) : (
                  <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                    <Typography variant="body1" color="textSecondary">
                      No tasks yet. Add one!
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </SidebarLayout>

       {/* Delete Confirmation Dialog */}
       <Dialog open={deleteConfirmationOpen} onClose={cancelDeleteTask}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to delete this task?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDeleteTask} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDeleteTask} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoPage;
