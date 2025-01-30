import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../model/types'; // Импортируйте тип Task
import tasksApi from '../../../../api/tasksApi';

export const useTasksQuery = () => {
    return useQuery({
        queryKey: ['tasks'],
        queryFn: tasksApi.fetchTasks,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Используйте объект с queryKey
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Task, Error, Task>({
        mutationFn: tasksApi.updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Используйте объект с queryKey
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: tasksApi.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Используйте объект с queryKey
        },
    });
};