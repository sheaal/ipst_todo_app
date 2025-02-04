import React from 'react';
import { Button } from '../../button';

interface TaskEditFormButtonProps {
    onSave: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const TaskEditFormButton: React.FC<TaskEditFormButtonProps> = ({ onSave, onCancel }) => {
    return (
        <div className="flex justify-between">
            <Button type="submit" onClick={onSave}>
                Сохранить изменения
            </Button>
            <Button type="button" onClick={onCancel}>
                Отмена
            </Button>
        </div>
    );
};

export default TaskEditFormButton;