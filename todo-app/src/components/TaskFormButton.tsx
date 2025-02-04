import React from 'react';

interface TaskFormButtonProps {
    onClick: (e: React.FormEvent) => void;
}

const TaskFormButton: React.FC<TaskFormButtonProps> = ({ onClick }) => {
    return (
        <button 
            type="submit" 
            onClick={onClick}
            className="bg-[#210e16] text-white px-3 py-1 rounded hover:bg-[#3a1f24] transition"
        >
            Добавить задачу
        </button>
    );
};

export default TaskFormButton;