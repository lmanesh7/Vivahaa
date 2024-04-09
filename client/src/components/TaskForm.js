// TaskForm.js
import React, { useState } from 'react';
import { TextField, Button, Collapse, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const TaskForm = ({ categories, onTaskAdd }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [expanded, setExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        debugger;
        const selectedDate = new Date(dueDate);
        const timezoneOffset = selectedDate.getTimezoneOffset();
        const adjustedDate = new Date(
          selectedDate.getTime() - timezoneOffset * 60 * 1000
        );
        setDueDate(adjustedDate)
        const task = { name, description, dueDate, category };
        onTaskAdd(task);
        setName('');
        setDescription('');
        setDueDate('');
        setCategory('');
        setExpanded(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<Add />}
                style={{ backgroundColor: 'black', color: 'white' }} 
                onClick={() => setExpanded(!expanded)}
            >
                Add Task
            </Button>
            <Collapse in={expanded}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline fullWidth />
                    <TextField type="date" label="Due Date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} fullWidth />
                    <FormControl fullWidth>
                        <InputLabel>Category</InputLabel>
                        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button variant="contained" style={{ backgroundColor: 'black', color: 'white' }}  type="submit" fullWidth>Add Task</Button>
                </form>
            </Collapse>
        </div>
    );
};

export default TaskForm;
