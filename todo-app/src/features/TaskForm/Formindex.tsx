// src/features/TaskForm/Formindex.tsx
import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import { useTaskContext } from '../../app/context/TaskContext';

const TaskForm: React.FC = () => {
    const [taskText, setTaskText] = useState('');
    const { addTask } = useTaskContext();

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
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Введите задачу"
                required
            />
            <button type="submit">Добавить задачу</button>
        </form>
    );
};

export default TaskForm;