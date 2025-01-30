import React from 'react';
import TaskForm from '../../features/TaskForm/Formindex';
import TaskList from '../../features/TaskList';
import '../../App.css';

const HomePage: React.FC = () => {
    return (
        <div className="bg-[#574461] min-h-screen flex flex-col items-center justify-center text-white p-8">
            <div className="header-container flex items-center justify-center mb-5">
                <h1 className="text-3xl mr-5">Приложение для управления задачами</h1>
                <img 
                    src="src/img/cat.jpg" 
                    alt="фото" 
                    className="max-w-[7%] h-auto ml-2" 
                />
            </div>
            <TaskForm />
            <TaskList />
        </div>
    );
};

export default HomePage;