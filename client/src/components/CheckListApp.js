// App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Drawer   } from '@material-ui/core';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import ProgressBar from './ProgressBar';
import axios from 'axios';
import EditTask from './EditTask';

const App = () => {
    const [tasks, setTasks] = useState([
        {
            category: 'Venues',
            tasks: [
                {   _id: '6611935485db713d071c044d',
                    name: 'Book Venue',
                    description: 'Book the wedding venue for the ceremony.',
                    dueDate: '2024-04-15',
                    category: 'Venues',
                    completed: false
                },
                {   _id: '6611935485db713d071c04d1',
                    name: 'Book Venues',
                    description: 'Book the wedding venue for the ceremony.',
                    dueDate: '2024-04-15',
                    category: 'Venues',
                    completed: false
                },
                {
                    "_id": "6611935485db713d071c04d3",
                    "name": "Book Venues",
                    "description": "Book the wedding venue for the ceremony. Choose a venue that reflects Indian architecture and ambiance, such as a temple, heritage hall, or traditional house (agraharam). Reserve separate spaces within the venue for traditional ceremonies like the muhurtham (wedding ceremony) and sangeet (pre-wedding celebration).",
                    "dueDate": "2024-04-15",
                    "category": "Venues",
                    "completed": false
                  },
                  {
                    "_id": "6611935485db713d071c04d4",
                    "name": "Arrange Accommodation",
                    "description": "Ensure there are nearby accommodations available for out-of-town guests, preferably with a touch of Indian hospitality.",
                    "dueDate": "2024-04-15",
                    "category": "Accommodation",
                    "completed": false
                  },
                  {
                    "_id": "6611935485db713d071c04d6",
                    "name": "Catering Selection",
                    "description": "Explore catering options offering authentic Indian cuisine, including vegetarian delicacies like dosas, idlis, and vadas.",
                    "dueDate": "2024-04-15",
                    "category": "Catering",
                    "completed": false
                  }
                  
            
                  
                  
            ]
        },
        {
            category: 'Photographers',
            tasks: [
                {   _id: '6611935485db713d071c04d8',
                    name: 'Hire Photographer',
                    description: 'Hire a professional photographer to capture the special moments.',
                    dueDate: '2024-05-01',
                    category: 'Photographers',
                    completed: false
                }
            ]
        }
    ]);
    const userLoggedIn = sessionStorage.getItem('loggedInUser');
    const [editTaskId, setEditTaskId] = useState(null); // State to store the ID of the task being edited
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [openEditTask, setOpenEditTask] = useState(false);
    // State to manage the task being edited
    const [editedTask, setEditedTask] = useState(null);
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    useEffect(() => {
        fetchTasks(); // Fetch tasks from the backend when the component mounts
    }, []); // Empty dependency array to ensure this effect runs only once

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:3500/api/tasks');
            const fetchedTasks = response.data;
            debugger;
            // Merge fetched tasks with hardcoded tasks
            const mergedTasks = fetchedTasks.map(fetchedCategory => {
                const existingCategory = tasks.find(taskCategory => taskCategory.category === fetchedCategory.category);
                if (existingCategory) {
                    // If category already exists, merge tasks
                    return {
                        ...existingCategory,
                        tasks: [...existingCategory.tasks, ...fetchedCategory.tasks]
                    };
                } else {
                    // If category doesn't exist, add fetched category
                    return fetchedCategory;
                }
            });
            
            // Set merged tasks as the new tasks state
            setTasks(mergedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    
    useEffect(() => {
        updateProgress();
    }, [tasks]);

    const updateProgress = () => {
        const totalTasks = tasks.reduce((acc, category) => acc + category.tasks.length, 0);
        const completedTasks = tasks.reduce((acc, category) => acc + category.tasks.filter(task => task.completed).length, 0);
        const progress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        setProgress(progress);
    };

    const handleTaskAdd = async (task) => {
        debugger
        const savedData = await axios.post(`http://localhost:3500/api/savetask/${userLoggedIn}`,task);
        task = savedData.data;
        const updatedTasks = tasks.map(category => {
            if (category.category === task.category) {
                return {
                    ...category,
                    tasks: [...category.tasks, task]
                };
            }
            return category;
        });
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
    const handleEditTask = (taskId) => {
        setEditTaskId(taskId);
        handleTaskAdd(taskId); // Set the ID of the task being edited
        setEditTaskOpen(true);
        setOpenEditTask(true) // Open the EditTask component
    };

        const handleSaveProgress = async () => {
        try {debugger
            const taskArray = Object.values(tasks).map(category => ({
                category: category.category,
                tasks: Object.values(category.tasks)
              }));
            await axios.post('http://localhost:3500/api/tasks', { taskArray });
            console.log('Tasks saved successfully');
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    };
    const handleEditTaskClose = () => {
        setOpenEditTask(false);
        setEditedTask(null);
    };
    

    const categories = Array.from(new Set(tasks.map(task => task.category)));
    const [progress, setProgress] = useState(0);
    
    if(!userLoggedIn || sessionStorage.getItem('role')!='5152'){
        return (
            <h1>User not logged in. Please login to view this page.</h1>
        )
    }

    return (
        <Container maxWidth="md">
            <Typography variant="h2" align="center" gutterBottom>Checklist</Typography>
            <ProgressBar completed={progress} />
            <TaskForm categories={categories} onTaskAdd={handleTaskAdd} />
            <TaskList 
    tasks={tasks} 
    onTaskCheck={handleTaskCheck} 
    onTaskEdit={handleEditTask} // Ensure this prop name is correct
/>

            <div>
              <Button 
    variant="contained" 
    style={{ backgroundColor: 'black', color: 'white' }} // Set background color to black and text color to white
    onClick={handleSaveProgress}
>
    Save Progress
</Button>

            </div>
            <Drawer anchor="right" open={editTaskOpen} onClose={() => setEditTaskOpen(false)}>
           <EditTask 
    open={openEditTask} 
    task={editTaskId} 
    onClose={handleEditTaskClose} 
    onEdit={handleEditTask} // Ensure this prop name matches the one received in TaskList
/>
            </Drawer>
        </Container>
        
    );
};

export default App;
