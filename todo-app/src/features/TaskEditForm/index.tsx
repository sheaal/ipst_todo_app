import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../app/context/TaskContext';
import { Task } from '../../entities/tasks/slice/taskSlice';

// Определяем интерфейс для пропсов компонента
interface TaskEditFormProps {
    task: Task;
    onClose: () => void;
}

const TaskEditForm: React.FC<TaskEditFormProps> = ({ task, onClose }) => {
    const { updateTask } = useTaskContext();
    const [taskText, setTaskText] = useState(task.text);

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => { // e(event) доступ к инф о событии, которое произошло/обработка отправки, не теряя состояние приложения 
        e.preventDefault();// Предотвращаем перезагрузку страницы
        if (taskText.trim()) { // Проверяем, что текст не пустой
            updateTask({ ...task, text: taskText });
            onClose();
        }
    };

    // Эффект для обновления состояния текста задачи при изменении пропсов
    useEffect(() => {
        setTaskText(task.text);
    }, [task]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                placeholder="Редактировать задачу"
                required
            />
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
        </form>
    );
};

export default TaskEditForm;