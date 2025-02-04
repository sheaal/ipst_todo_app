import React, { useState } from 'react';
import { Task } from '../../entities/tasks/model/types';
import TaskEditForm from '../TaskEditForm/Editindex';
import DatePicker from '../DatePicker';
import { completeTask, deleteTask, useTaskStore } from '../../entities/tasks/store';
import TaskButtons from '../../shared/components/TaskButtons';
import '../../App.css';

const TaskList: React.FC = () => {
    // const queryClient = useQueryClient();
    const { tasks } = useTaskStore();
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const filteredTasks = tasks.filter(task => task.date === selectedDate);

    // Функция для обработки редактирования задачи
    const handleEdit = (task: Task) => {
        setEditingTask(task);
    };

    const handleCloseEdit = () => {
        setEditingTask(null);
    };

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
                                    onDelete={() => deleteTask(task.id)} 
                                    onEdit={() => handleEdit(task)} 
                                    onComplete={() => completeTask(task.id)} 
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
                    <h3>Редактировать задачу</h3>
                    <TaskEditForm task={editingTask} onClose={handleCloseEdit} />
                </div>
            )}
        </div>
    );
};

export default TaskList;