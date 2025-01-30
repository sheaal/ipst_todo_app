// src/features/TaskList/index.tsx
import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import TaskEditForm from '../TaskEditForm/Editindex';
import DatePicker from '../DatePicker';
import { useTaskContext } from '../../app/context/TaskContext';
import '../../App.css';

const TaskList: React.FC = () => {
    const { filteredTasks, deleteTask, completeTask, selectedDate, setSelectedDate } = useTaskContext();
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleCloseEdit = () => {
        setEditingTask(null);
    };

    return (
        <div>
            <h1>Задачи на {selectedDate}</h1>
            <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <ul>
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <li key={task.id}>
                            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.text}
                            </span>
                            <button onClick={() => completeTask(task.id)}>Выполнить</button>
                            <button onClick={() => handleEdit(task)}>Редактировать</button>
                            <button onClick={() => deleteTask(task.id)}>Удалить</button>
                        </li>
                    ))
                ) : (
                    <li>Нет задач на этот день.</li>
                )}
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