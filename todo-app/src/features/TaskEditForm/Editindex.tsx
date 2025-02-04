import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import { useTaskStore } from '../../entities/tasks/store';
import TaskEditFormButton from '../../components/TaskEditFormButton';
import '../../App.css';

// Определяем интерфейс для пропсов компонента
interface TaskEditFormProps {
    task: Task;
    onClose: () => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onClose }) => {
    const { updateTask } = useTaskStore();
    const [taskText, setTaskText] = useState(task.text);

    // Функция для обработки отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedTask: Task = { ...task, text: taskText };
        updateTask(updatedTask);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md w-full max-w-md">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                required
                className="border border-black-300 p-2 rounded w-full mb-4"
                placeholder="Введите текст задачи"
            />
            <TaskEditFormButton 
                onSave={handleSubmit} 
                onCancel={onClose} 
            />
        </form>
    );
};

export default TaskEditForm;