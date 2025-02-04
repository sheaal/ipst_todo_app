import React from 'react';
import { Button } from '../../button';

interface TaskFormButtonProps {
    onClick: (e: React.FormEvent) => void;
}

const TaskFormButton: React.FC<TaskFormButtonProps> = ({ onClick }) => {
    return (
        <Button type="submit" onClick={onClick}>
            Добавить задачу
        </Button>
    );
};

export default TaskFormButton;