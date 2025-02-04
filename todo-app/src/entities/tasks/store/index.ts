import { createContext, useContext } from 'react';
import { Store } from '@tanstack/store';
import { Task } from '../../../entities/tasks/model/types';

// Начальное состояние
const storedTasks = localStorage.getItem('tasks');
const initialState: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

// Создаем хранилище
const store = new Store<Task[]>(initialState);

// Определяем редюсеры как функции
export const addTask = (task: Task) => {
    store.setState(prevState => {
        const updatedTasks = [...prevState, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Сохраняем в localStorage
        return updatedTasks;
    });
};

export const updateTask = (updatedTask: Task) => {
    store.setState(prevState => {
        const newState = prevState.map(task => (task.id === updatedTask.id ? updatedTask : task));
        localStorage.setItem('tasks', JSON.stringify(newState)); // Сохраняем в localStorage
        return newState;
    });
};

export const deleteTask = (id: string) => {
    store.setState(prevState => {
        const newState = prevState.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(newState)); // Сохраняем в localStorage
        return newState;
    });
};

export const completeTask = (id: string) => {
    store.setState(prevState => {
        const newState = prevState.map(task => (task.id === id ? { ...task, completed: true } : task));
        localStorage.setItem('tasks', JSON.stringify(newState)); // Сохраняем в localStorage
        return newState;
    });
};

// Создаем контекст для хранилища
const TaskStoreContext = createContext<{
    tasks: Task[];
    addTask: typeof addTask;
    updateTask: typeof updateTask;
    deleteTask: typeof deleteTask;
    completeTask: typeof completeTask;
} | undefined>(undefined);

// Хук для использования хранилища
export const useTaskStore = () => {
    const context = useContext(TaskStoreContext);
    if (!context) {
        throw new Error('useTaskStore должен использоваться в TaskStoreProvider');
    }
    return context;
};

// Экспортируем хранилище и действия
export { TaskStoreContext, store };