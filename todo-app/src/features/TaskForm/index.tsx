import React, { useState } from 'react';
import useCreateTask from '../../entities/tasks/create/use-case'; // Убедитесь, что путь правильный

const TaskForm: React.FC = () => {
    const [taskText, setTaskText] = useState('');
    const createTask = useCreateTask();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskText.trim()) {
            createTask(taskText);
            setTaskText('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Введите задачу"
            />
            <button type="submit">Добавить задачу</button>
        </form>
    );
};

export default TaskForm;