import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, List, ListItem, ListItemText, Checkbox, makeStyles, IconButton } from '@material-ui/core';
import { ExpandMore, Edit, Delete } from '@material-ui/icons';

const TaskList = ({ tasks, onTaskCheck, onTaskEdit, onTaskDelete }) => {
    const [expandedCategory, setExpandedCategory] = useState(null);
    const useStyles = makeStyles((theme) => ({
        completed: {
            textDecoration: 'line-through',
            color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();

    const handleChange = (category) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const handleTaskCheckboxToggle = (taskId) => {
        onTaskCheck(taskId);
    };

    const handleTaskEdit = (taskId) => {
        onTaskEdit(taskId);
    };

    const handleTaskDelete = (taskId) => {
        onTaskDelete(taskId);
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
