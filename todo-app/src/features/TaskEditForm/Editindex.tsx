import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import { useTaskContext } from '../../app/context/TaskContext';
import '../../App.css';

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
        <form onSubmit={handleSubmit} className="p-4 rounded-lg shadow-md w-full max-w-md">
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                required
                className="border border-black-300 p-2 rounded w-full mb-4"
                placeholder="Введите текст задачи"
            />
            <div className="flex justify-between">
                <button 
                    type="submit" 
                    className="bg-[#210e16] text-white px-4 py-2 rounded hover:bg-[#3a1f24] transition"
                >
                    Сохранить изменения
                </button>
                <button 
                    type="button" 
                    onClick={onClose} 
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
                >
                    Отмена
                </button>
            </div>
        </form>
    );
};

export default TaskEditForm;