import React from 'react';
import TaskForm from '../../features/TaskForm';
import TaskList from '../../features/TaskList/index.tsx';

const HomePage: React.FC = () => {
    return (
        <div>
            <h1>Управление задачами</h1>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default HomePage;