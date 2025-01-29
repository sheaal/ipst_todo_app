import React from 'react';

interface DatePickerProps {
    selectedDate: string;
    onDateChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onDateChange(event.target.value);
    };

    return (
        <div>
            <input
                type="date"
                value={selectedDate}
                onChange={handleChange}
            />
        </div>
    );
};

export default DatePicker;