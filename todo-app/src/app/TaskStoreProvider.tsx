import React, { useEffect, useState } from 'react';
import { TaskStoreContext, store, addTask, updateTask, deleteTask, completeTask } from '../entities/tasks/store';

const TaskStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState(store.state);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setTasks(store.state); // Обновляем состояние при изменении в хранилище
        });

        return () => {
            unsubscribe(); // Отписываемся от обновлений при размонтировании
        };
    }, []);

    return (
        <TaskStoreContext.Provider value={{
            tasks,
            addTask,
            updateTask,
            deleteTask,
            completeTask,
        }}>
            {children}
        </TaskStoreContext.Provider>
    );
};

export default TaskStoreProvider;