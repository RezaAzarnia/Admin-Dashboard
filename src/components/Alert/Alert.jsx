import React from 'react';
import './Alert.scss'
const Alert = ({ message }) => (
    <div className="alert">
        {message}
    </div>
);

export default Alert;