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
            category: 'Venue',
            tasks: [
                {
                    _id: '615a901913a961001b3cc288',
                    name: 'Select Traditional Indian Venue',
                    description: 'Choose a venue that reflects Indian architecture and ambiance, such as a temple, heritage hall, or traditional house (agraharam).',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Venue',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc289',
                    name: 'Book Venue for Traditional Ceremonies',
                    description: 'Reserve separate spaces within the venue for traditional ceremonies like the muhurtham (wedding ceremony) and sangeet (pre-wedding celebration).',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Venue',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc28a',
                    name: 'Arrange Accommodation for Guests',
                    description: 'Ensure there are nearby accommodations available for out-of-town guests, preferably with a touch of Indian hospitality.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Venue',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc28b',
                    name: 'Catering Selection',
                    description: 'Explore catering options offering authentic Indian cuisine, including vegetarian delicacies like dosas, idlis, and vadas.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Venue',
                    completed: false
                }
            ]
        }
        ,
        {
            category: 'Mehendi Artist',
            tasks: [
                {
                    _id: '615a901913a961001b3cc27f',
                    name: 'Select Experienced Mehendi Artist',
                    description: 'Choose a Mehendi artist experienced in intricate Indian Mehendi designs, incorporating motifs like mango leaves, peacocks, and temple patterns.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Mehendi Artist',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc280',
                    name: 'Design Consultation',
                    description: 'Schedule a consultation with the Mehendi artist to discuss design preferences and cultural significance, incorporating elements of Chinese culture if desired.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Mehendi Artist',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc281',
                    name: 'Venue Setup for Mehendi Ceremony',
                    description: 'Arrange a vibrant and comfortable setup for the Mehendi ceremony, with seating arrangements and traditional Indian decor elements like rangoli and torans.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Mehendi Artist',
                    completed: false
                }
            ]
        },
        
        {
            category: 'Photographer',
            tasks: [
                {
                    _id: '615a901913a961001b3cc282',
                    name: 'Hire Experienced Indian Wedding Photographer',
                    description: 'Engage a photographer experienced in capturing Indian weddings, familiar with the rituals and nuances unique to the culture.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Photographer',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc283',
                    name: 'Capture Traditional Ceremonies',
                    description: 'Discuss with the photographer the importance of capturing traditional Indian rituals like the Kashi Yatra, Oonjal (swing ceremony), and Mangalsutra Dharana.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Photographer',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc284',
                    name: 'Pre-Wedding Shoot Locations',
                    description: 'Explore picturesque South Indian locations for pre-wedding photoshoots.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Photographer',
                    completed: false
                }
            ]
        },
        {
            category: 'Decorator',
            tasks: [
                {
                    _id: '615a901913a961001b3cc285',
                    name: 'Theme and Decor Concept',
                    description: 'Decide on a theme that blends Indian cultural elements, incorporating vibrant colors, traditional motifs, and floral arrangements.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Decorator',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc286',
                    name: 'Venue Decoration',
                    description: 'Coordinate with the decorator to adorn the venue with South Indian decor elements like marigold garlands, banana leaves, and traditional Indian textiles.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Decorator',
                    completed: false
                },
                {
                    _id: '615a901913a961001b3cc287',
                    name: 'Mandap Decoration',
                    description: 'Design an exquisite mandap adorned with intricate floral arrangements, traditional Indian motifs, and auspicious symbols reflecting cultures.',
                    dueDate: localStorage.getItem('eventDate') ? localStorage.getItem('eventDate') : '2024-05-01',
                    category: 'Decorator',
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
        // Function to save hardcoded tasks to the backend
        const saveHardcodedTasks = async () => {
            try {
                const tasksToSave = [];
                for (const category of tasks) {
                    for (const task of category.tasks) {
                        // Check if the task with the same ID already exists in tasksToSave
                        const isDuplicate = tasksToSave.some(savedTask => savedTask._id === task._id);
                        if (!isDuplicate) {
                            // If the task is not a duplicate, add it to tasksToSave
                            tasksToSave.push({
                                _id: task._id,
                                name: task.name,
                                description: task.description,
                                dueDate: task.dueDate,
                                category: task.category,
                                completed: task.completed,
                                user: userLoggedIn // Assuming userLoggedIn is defined in your component
                            });
                        }
                    }
                }
    
                // Send tasks to the backend
                await axios.post('http://localhost:3500/api/savealltasks', { tasks: tasksToSave });
                console.log('Hardcoded tasks saved to the backend successfully');
            } catch (error) {
                console.error('Error saving hardcoded tasks:', error);
            }
        };
    
        // Call the function to save hardcoded tasks only once
        saveHardcodedTasks();
    }, []);
    // Include tasks in the dependency array to ensure the effect runs whenever tasks change
     // Empty dependency array ensures this effect runs only once
    
    useEffect(() => {
        fetchTasks(); // Fetch tasks from the backend when the component mounts
    }, []); // Empty dependency array to ensure this effect runs only once

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:3500/api/tasks/${userLoggedIn}`);
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
            setTasks(fetchedTasks);
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
