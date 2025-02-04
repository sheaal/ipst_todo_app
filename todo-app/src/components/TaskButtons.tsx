import React from 'react';

interface TaskButtonsProps {
    onDelete: () => void;
    onEdit: () => void;
    onComplete: () => void;
}

const TaskButtons: React.FC<TaskButtonsProps> = ({ onDelete, onEdit, onComplete }) => {
    return (
        <div className="ml-4">
            <button 
                onClick={onDelete} 
                className="bg-[#210e16] text-white px-2 py-1 rounded hover:bg-[#3a1f24] transition mr-2"
            >
                Удалить
            </button>
            <button 
                onClick={onEdit} 
                className="bg-[#210e16] text-white px-2 py-1 rounded hover:bg-[#3a1f24] transition mr-2"
            >
                Редактировать
            </button>
            <button 
                onClick={onComplete} 
                className="bg-[#210e16] text-white px-2 py-1 rounded hover:bg-[#3a1f24] transition"
            >
                Выполнить
            </button>
        </div>
    );
};

export default TaskButtons;