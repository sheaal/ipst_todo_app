import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { Store } from '@tanstack/store';
import { Task } from '../model/types';
import tasksApi from '../../../api/tasksApi';

// Начальное состояние
const storedTasks = localStorage.getItem('tasks');
const initialState: Task[] = storedTasks ? JSON.parse(storedTasks) : [];

// Создаем хранилище
const store = new Store<Task[]>(initialState);

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Обновляем кэш задач
        },
    });
};

// Определяем редюсеры как функции
export const setTasks = (tasks: Task[]) => {
    store.setState(() => tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (task: Task) => {
    store.setState(prevState => {
        const updatedTasks = [...prevState, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
    });
};

export const updateTask = (updatedTask: Task) => {
    store.setState(prevState => 
        prevState.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
};

export const deleteTask = (id: string) => {
    store.setState(prevState => 
        prevState.filter(task => task.id !== id)
    );
};

export const completeTask = (id: string) => {
    store.setState(prevState => 
        prevState.map(task => (task.id === id ? { ...task, completed: true } : task))
    );
};

// Создаем контекст для хранилища
const TaskStoreContext = createContext(store);

// Хук для использования хранилища
export const useTaskStore = () => {
    return useContext(TaskStoreContext);
};

// Экспортируем хранилище и действия
export { TaskStoreContext, store };