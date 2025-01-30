// src/features/TaskEditForm/Editindex.tsx
import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import { useTaskContext } from '../../app/context/TaskContext';

interface TaskEditFormProps {
    task: Task;
    onClose: () => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onClose }) => {
    const { updateTask } = useTaskContext();
    const [taskText, setTaskText] = useState(task.text);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedTask: Task = { ...task, text: taskText };
        updateTask(updatedTask); // Обновляем задачу
        onClose(); // Закрываем форму редактирования
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                required
            />
            <button type="submit">Сохранить изменения</button>
            <button type="button" onClick={onClose}>Отмена</button>
        </form>
    );
};

export default TaskEditForm;