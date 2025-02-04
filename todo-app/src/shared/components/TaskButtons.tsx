import React from 'react';
import { Button } from '../../button';

interface TaskButtonsProps {
    onDelete: () => void;
    onEdit: () => void;
    onComplete: () => void;
}

const TaskButtons: React.FC<TaskButtonsProps> = ({ onDelete, onEdit, onComplete }) => {
    return (
        <div className="ml-4">
            <Button onClick={onDelete}>
                Удалить
            </Button>
            <Button onClick={onEdit}>
                Редактировать
            </Button>
            <Button onClick={onComplete}>
                Выполнить
            </Button>
        </div>
    );
};

export default TaskButtons;