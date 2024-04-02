// ProgressBar.js
import React from 'react';
import { LinearProgress } from '@material-ui/core';

const ProgressBar = ({ completed }) => {
    return (
        <LinearProgress variant="determinate" value={completed} />
    );
};

export default ProgressBar;
