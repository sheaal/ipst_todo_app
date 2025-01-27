// src/features/TaskList/index.tsx
import React from 'react';
import { useTaskContext } from '../../app/context/TaskContext'; // Импортируем контекст задач

const TaskList: React.FC = () => {
    const { tasks, deleteTask, completeTask } = useTaskContext(); // Получаем задачи и функции из контекста

    return (
        <div>
            <h2>Список задач</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                            {task.text}
                        </span>
                        <button onClick={() => completeTask(task.id)}>Завершить</button>
                        <button onClick={() => deleteTask(task.id)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;