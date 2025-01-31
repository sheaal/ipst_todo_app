import { Task } from '../entities/tasks/model/types';

// Имитация запросов к бэкенду
const tasksApi = {
    fetchTasks: async (): Promise<Task[]> => {
        const storedTasks = localStorage.getItem('tasks');
        return storedTasks ? JSON.parse(storedTasks) : [];
    },

    addTask: async (task: Task): Promise<Task> => {
        const tasks = await tasksApi.fetchTasks();
        const updatedTasks = [...tasks, task];
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return task;
    },

    updateTask: async (updatedTask: Task): Promise<Task> => {
        const tasks = await tasksApi.fetchTasks();
        const updatedTasks = tasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTask;
    },

    deleteTask: async (id: string): Promise<void> => {
        const tasks = await tasksApi.fetchTasks();
        const updatedTasks = tasks.filter(task => task.id !== id);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
};

export default tasksApi;
