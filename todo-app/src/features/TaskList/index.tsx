import React, { useState } from 'react';
import { useTaskContext } from '../../app/context/TaskContext';
import TaskEditForm from '../TaskEditForm';
import { Task } from '../../entities/tasks/slice/taskSlice';
import DatePicker from '../DatePicker';
import '../../App.css';

const TaskList: React.FC = () => { // React.FC - тип для описания функ компонентов, дает понять, что может принимать пропсы
    const { filteredTasks, selectedDate, setSelectedDate, deleteTask, completeTask } = useTaskContext(); // Получаем задачи и функции из контекста
    const [editingTask, setEditingTask] = useState<Task | null>(null); // Состояние для редактируемой задачи

    const handleEdit = (task: Task) => { // Указываем тип для task
        setEditingTask(task);
    };

    const handleCloseEdit = () => {
        setEditingTask(null); // Закрываем форму редактирования
    };

    return (
        <div>
            <h1>Задачи на {selectedDate}</h1>
            <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => completeTask(task.id)}>Выполнить</button>
                        <button onClick={() => handleEdit(task)}>Редактировать</button>
                        <button onClick={() => deleteTask(task.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
            {editingTask && (
                <div>
                    <h3>Редактировать задачу</h3>
                    <TaskEditForm task={editingTask} onClose={handleCloseEdit} />
                </div>
            )}
        </div>
    );
};

export default TaskList;