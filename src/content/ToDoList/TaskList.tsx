// TaskList.tsx
import React from 'react';
import { List } from '@mui/material';
import TaskListItem from '@/content/ToDoList/TaskListItem';
import { Task } from '@/atoms/taskAtom';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedTask: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask, onUpdateTask }) => {
  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onDelete={() => onDeleteTask(task.id)}
          onUpdate={(updatedTask) => onUpdateTask(task.id, updatedTask)}
        />
      ))}
    </List>
  );
};

export default TaskList;