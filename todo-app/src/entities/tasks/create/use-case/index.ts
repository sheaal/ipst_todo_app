import { useTaskContext } from '@/app/context/TaskContext';
import { Task } from '../../slice/taskSlice';

const useCreateTask = () => {
    const { addTask } = useTaskContext();

    const createTask = (text: string) => {
        const newTask: Task = {
            id: Date.now().toString(),
            text,
            completed: false,
            date: new Date().toISOString().split('T')[0], // Текущая дата
        };
        addTask(newTask);
    };

    return createTask;
};

export default useCreateTask;