import React from 'react';

interface TaskEditFormButtonProps {
    onSave: (e: React.FormEvent) => void;
    onCancel: () => void;
}

const TaskEditFormButton: React.FC<TaskEditFormButtonProps> = ({ onSave, onCancel }) => {
    return (
        <div className="flex justify-between">
            <button 
                type="submit" 
                onClick={onSave}
                className="bg-[#210e16] text-white px-4 py-2 rounded hover:bg-[#3a1f24] transition"
            >
                Сохранить изменения
            </button>
            <button 
                type="button" 
                onClick={onCancel}
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition"
            >
                Отмена
            </button>
        </div>
    );
};

export default TaskEditFormButton;