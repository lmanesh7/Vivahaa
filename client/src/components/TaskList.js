import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, List, ListItem, ListItemText, Checkbox, makeStyles, IconButton, Button } from '@material-ui/core';
import { ExpandMore, Edit, Delete } from '@material-ui/icons';
//import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom

const TaskList = ({ tasks, onTaskCheck, onTaskEdit, onTaskDelete }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const useStyles = makeStyles((theme) => ({
        completed: {
            textDecoration: 'line-through',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();

    //const history = useHistory(); // Get the history object from useHistory

    const handleChange = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleTaskCheckboxToggle = (taskId) => {
        onTaskCheck(taskId);
    };

    const handleTaskEdit = (taskId) => {
        debugger
        onTaskEdit(taskId);
    };

    const handleTaskDelete = (taskId) => {
        onTaskDelete(taskId);
    };

    const handleRedirect = (task) => {
        // Redirect to your desired page
       // history.push('/your-page-url');
       if(task.category==='Venue'){
        window.location = '/show/venues'
       }
       if(task.category==='Mehendi Artist'){
        window.location = '/show/mehindi'
       }
       if(task.category==='Photographer'){
        window.location = '/show/photo'
       }
       if(task.category==='Decorator'){
        window.location = '/show/decor'
       }

    };

    return (
        <div>
            {tasks.map((categoryTasks, index) => (
                <ExpansionPanel key={index} expanded={expandedCategory === categoryTasks.category} onChange={() => handleChange(categoryTasks.category)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                        <Typography>
                            {categoryTasks.category} ({categoryTasks.tasks.filter(task => task.completed).length}/{categoryTasks.tasks.length})
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <List>
                            {categoryTasks.tasks.map((task, taskIndex) => (
                                <ListItem key={taskIndex}>
                                    <Checkbox checked={task.completed} onChange={() => handleTaskCheckboxToggle(task._id)} />
                                    <ListItemText primary={task.description} secondary={`Due Date: ${task.dueDate}`} className={task.completed ? classes.completed : ''} />
                                    <IconButton onClick={() => handleTaskEdit(task)}><Edit /></IconButton>
                                    <IconButton onClick={() => handleTaskDelete(task._id)}><Delete /></IconButton>
                                    <Button onClick={()=>handleRedirect(task)}>Go to {task.category}</Button> {/* Button for redirect */}
                                </ListItem>
                            ))}
                        </List>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
};

export default TaskList;
