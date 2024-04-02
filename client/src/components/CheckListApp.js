// App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressBar from './ProgressBar';

const App = () => {
    const [tasks, setTasks] = useState([
        {
            category: 'Venues',
            tasks: [
                {   _id: '12345',
                    name: 'Book Venue',
                    description: 'Book the wedding venue for the ceremony.',
                    dueDate: '2024-04-15',
                    category: 'Venues',
                    completed: false
                },
                {   _id: '12346',
                    name: 'Book Venues',
                    description: 'Book the wedding venue for the ceremony.',
                    dueDate: '2024-04-15',
                    category: 'Venues',
                    completed: false
                }
            ]
        },
        {
            category: 'Photographers',
            tasks: [
                {   _id: '12347',
                    name: 'Hire Photographer',
                    description: 'Hire a professional photographer to capture the special moments.',
                    dueDate: '2024-05-01',
                    category: 'Photographers',
                    completed: false
                }
            ]
        }
    ]);

    useEffect(() => {
        updateProgress();
    }, [tasks]);

    const updateProgress = () => {
        const totalTasks = tasks.reduce((acc, category) => acc + category.tasks.length, 0);
        const completedTasks = tasks.reduce((acc, category) => acc + category.tasks.filter(task => task.completed).length, 0);
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        setProgress(progress);
    };

    const handleTaskAdd = (task) => {debugger
        const updatedTasks = tasks.map(category => ({
            ...category,
            tasks: [...category.tasks, task] // Add the new task to the tasks array of the category
        }));
        setTasks(updatedTasks);
    };
    

    const handleTaskCheck = (taskId) => {
        debugger
        const updatedTasks = tasks.map(category => ({
            ...category,
            tasks: category.tasks.map(task =>
                task._id === taskId ? { ...task, completed: !task.completed } : task
            )
        }));
        setTasks(updatedTasks);
    };
    

    const categories = Array.from(new Set(tasks.map(task => task.category)));
    const [progress, setProgress] = useState(0);

    return (
        <Container maxWidth="md">
            <Typography variant="h2" align="center" gutterBottom>Checklist</Typography>
            <ProgressBar completed={progress} />
            <TaskForm categories={categories} onTaskAdd={handleTaskAdd} />
            <TaskList tasks={tasks} onTaskCheck={handleTaskCheck} />
        </Container>
    );
};

export default App;
