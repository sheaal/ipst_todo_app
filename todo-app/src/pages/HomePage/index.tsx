// src/pages/HomePage.tsx

import React from 'react';
import TaskForm from '../../features/TaskForm/Formindex';
import TaskList from '../../features/TaskList';

const HomePage: React.FC = () => {
    return (
        <div>
            <div className="header-container">
                <h1>Приложение для управления задачами</h1>
                <img src="src/img/cat.jpg" alt="фото" style={{ maxWidth: '7%', height: 'auto', margin: '0 0 0 10px' }}/>
            </div>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default HomePage;