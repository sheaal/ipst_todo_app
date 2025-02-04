import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import TaskEditForm from '../TaskEditForm/Editindex';
import DatePicker from '../DatePicker';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import tasksApi from '../../api/tasksApi';
import { useTaskStore } from '../../entities/tasks/store';
import TaskButtons from '../../components/TaskButtons';
import '../../App.css';

const TaskList: React.FC = () => {
    const queryClient = useQueryClient();
    const { tasks } = useTaskStore();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    // Запрос для получения задач
    const { isLoading, error } = useQuery<Task[], Error>({
        queryKey: ['tasks'],
        queryFn: tasksApi.fetchTasks,
    });

    const filteredTasks = tasks.filter(task => task.date === selectedDate);

    // Мутация для удаления задачи
    const deleteTaskMutation = useMutation({
        mutationFn: (id: string) => tasksApi.deleteTask(id),
        onSuccess: (_, id) => {
            // Обновляем кэш после успешного удаления
            queryClient.setQueryData(['tasks'], (oldTasks: Task[] | undefined) => 
                oldTasks ? oldTasks.filter(task => task.id !== id) : []
            );
        }
    });

    // Мутация для завершения задачи
    const completeTaskMutation = useMutation({
        mutationFn: async (id: string) => {
            const currentTasks = await tasksApi.fetchTasks();
            const updatedTasks = currentTasks.map(task =>
                task.id === id ? { ...task, completed: true } : task // Обновляем статус задачи
            );
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            queryClient.setQueryData(['tasks'], updatedTasks);
            await tasksApi.updateTask(updatedTasks.find(task => task.id === id)!); // Обновляем задачу через API
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

    // Функция для обработки редактирования задачи
    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleCloseEdit = () => {
        setEditingTask(null);
    };

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error.message}</div>;

    return (
        <div className="bg-[#574461] h-110 flex flex-col items-center justify-center text-white p-8">
            <div className="header-container flex items-center justify-center mb-5">
                <h1 className="text-3xl mr-5">Задачи на {selectedDate}</h1>
            </div>
            <div className="border border-gray-200 rounded-lg p-4 mb-4 w-full max-h-[70px] max-w-[150px]">
                <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />
            </div>
            <div className="task-list border border-gray-200 text-white rounded-lg shadow-md p-4 w-full max-w-2xl">
                <ul className="list-none p-0">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((task) => (
                            <li key={task.id} className="flex justify-between items-center border-b py-2">
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: 'white' }}>
                                    {task.text}
                                </span>
                                <TaskButtons 
                                    onDelete={() => deleteTaskMutation.mutate(task.id)} 
                                    onEdit={() => handleEdit(task)} 
                                    onComplete={() => completeTaskMutation.mutate(task.id)} 
                                />
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">Нет задач на этот день.</li>
                    )}
                </ul>
            </div>
            {editingTask && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Редактировать задачу</h3>
                    <TaskEditForm task={editingTask} onClose={handleCloseEdit} />
                </div>
            )}
        </div>
    );
};

export default TaskList;