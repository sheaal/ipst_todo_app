import React from 'react';
import TaskForm from '../../features/TaskForm';
import { TaskProvider } from '../../app/context/TaskContext';
import TaskList from '../../features/TaskList/index.tsx';

const HomePage: React.FC = () => {
    return (
        <TaskProvider>
        <div>
            <div className="header-container">
            <h1>Приложение для управление задачами</h1>
            <img src="src/img/cat.jpg" alt="фото" style={{ maxWidth: '7%', height: 'auto', margin: '0 0 0 10px' }}/>
            </div>
            <TaskForm />
            <TaskList />
        </div>
        </TaskProvider>
    );
};

export default HomePage;