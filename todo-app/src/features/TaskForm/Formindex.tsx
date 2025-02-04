import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import { useTaskStore } from '../../entities/tasks/store';
import TaskFormButton from '../../shared/components/TaskFormButton';
import '../../App.css';

const TaskForm: React.FC = () => {
    const [taskText, setTaskText] = useState('');
    const { addTask } = useTaskStore();

    // Функция для обработки отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Проверяем, что текст задачи не пустой
        if (taskText.trim()) {
            const newTask: Task = {
                id: Date.now().toString(),
                text: taskText,
                completed: false,
                date: new Date().toISOString().split('T')[0],
            };

            addTask(newTask);
            setTaskText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4 w-full max-w-md p-4 rounded-lg shadow-md">
            <input 
                type="text" 
                value={taskText} 
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Введите задачу" 
                required 
                className="border border-gray-300 p-2 rounded w-full mb-2"
            />
            <TaskFormButton onClick={handleSubmit} />
        </form>
    );
};

export default TaskForm;