// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TaskStoreProvider from './app/TaskStoreProvider';

ReactDOM.render(
    <React.StrictMode>
        <TaskStoreProvider>
            <App />
        </TaskStoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
