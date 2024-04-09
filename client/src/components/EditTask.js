import React, { useState } from 'react';
import { Drawer, Typography, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    drawerContent: {
        width: '500px',
        padding: '20px',
    },
    title: {
        marginBottom: theme.spacing(2),
    },
    inputField: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

const EditTask = ({ open, task, onClose, onEdit }) => {
    const classes = useStyles();
    const [editedTask, setEditedTask] = useState(task);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSubmit = () => {
        onEdit(editedTask);
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <div className={classes.drawerContent}>
                <Typography variant="h5" className={classes.title}>Edit Task</Typography>
                <TextField
                    name="name"
                    label="Name"
                    value={editedTask.name}
                    onChange={handleChange}
                    fullWidth
                    className={classes.inputField}
                />
                <TextField
                    name="description"
                    label="Description"
                    value={editedTask.description}
                    onChange={handleChange}
                    fullWidth
                    multiline
                    className={classes.inputField}
                />
                <TextField
                    name="dueDate"
                    label="Due Date"
                    value={editedTask.dueDate}
                    onChange={handleChange}
                    fullWidth
                    type="date"
                    className={classes.inputField}
                />
                <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.button}>
                    Save
                </Button>
            </div>
        </Drawer>
    );
};

export default EditTask;
