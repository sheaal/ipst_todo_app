import React, { createContext, useContext, useState, useEffect } from 'react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
    date: string; // Дата создания задачи
}

interface TaskContextType {
    tasks: Task[];
    addTask: (task: Task) => void;
    updateTask: (task: Task) => void;
    deleteTask: (id: string) => void;
    completeTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
    const updateTask = (updatedTask: Task) => setTasks((prev) => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    const deleteTask = (id: string) => setTasks((prev) => prev.filter(task => task.id !== id));
    const completeTask = (id: string) => setTasks((prev) => prev.map(task => task.id === id ? { ...task, completed: true } : task));

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, completeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};