import React, { createContext, useContext, useState, useEffect } from 'react';
import { Task } from '../../entities/tasks/model/types';

interface TaskContextType {
    tasks: Task[];
    filteredTasks: Task[];
    selectedDate: string;
    addTask: (task: Task) => void;
    updateTask: (updatedTask: Task) => void;
    deleteTask: (id: string) => void;
    completeTask: (id: string) => void;
    setSelectedDate: (date: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Обновляем localStorage при изменении задач
    }, [tasks]);

    const addTask = (task: Task) => setTasks((prev) => [...prev, task]);
    const updateTask = (updatedTask: Task) => setTasks((prev) => prev.map(task => task.id === updatedTask.id ? updatedTask : task));
    const deleteTask = (id: string) => setTasks((prev) => prev.filter(task => task.id !== id));
    const completeTask = (id: string) => setTasks((prev) => prev.map(task => task.id === id ? { ...task, completed: true } : task));

    const filteredTasks = tasks.filter(task => task.date === selectedDate); // Фильтрация задач по выбранной дате

    return (
        <TaskContext.Provider value={{ tasks, filteredTasks, selectedDate, addTask, updateTask, deleteTask, completeTask, setSelectedDate }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext должен использоваться в TaskProvider');
    }
    return context;
};