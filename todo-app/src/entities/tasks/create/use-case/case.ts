import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Task } from '../../model/types';
import tasksApi from '../../../../api/tasksApi';

export const useTasksQuery = () => {
    return useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: tasksApi.fetchTasks,
    });
};

export const useCreateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Task, Error, Task>({
        mutationFn: tasksApi.addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] }); // Обновляем кэш задач
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<Task, Error, Task>({
        mutationFn: tasksApi.updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, string>({
        mutationFn: tasksApi.deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
    });
};
