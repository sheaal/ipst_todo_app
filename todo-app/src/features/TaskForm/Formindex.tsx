import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import { useTaskContext } from '../../app/context/TaskContext';
import '../../App.css';

const TaskForm: React.FC = () => {
    const [taskText, setTaskText] = useState('');
    const { addTask } = useTaskContext(); // Используем контекст для добавления задачи

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (taskText.trim()) {
            const newTask: Task = {
                id: Date.now().toString(),
                text: taskText,
                completed: false,
                date: new Date().toISOString().split('T')[0], // Устанавливаем текущую дату
            };

            addTask(newTask); // Добавляем задачу
            setTaskText(''); // Очищаем текст задачи
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
            <button 
                type="submit" 
                className="bg-[#210e16] text-white px-3 py-1 rounded hover:bg-[#3a1f24] transition"
            >
                Добавить задачу
            </button>
        </form>
    );
};

export default TaskForm;
