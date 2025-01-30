// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// // Определяем интерфейс Task
// export interface Task {
//     id: string;
//     text: string;
//     completed: boolean;
//     date: string;
// }

// // Создаем срез для управления состоянием задач
// const taskSlice = createSlice({
//     name: 'tasks',
//     initialState: [] as Task[],
//     reducers: {
//         addTask: (state, action: PayloadAction<Task>) => {
//             state.push(action.payload);
//         },
//         updateTask: (state, action: PayloadAction<Task>) => {
//             const index = state.findIndex(task => task.id === action.payload.id);
//             if (index !== -1) {
//                 state[index] = action.payload;
//             }
//         },
//         deleteTask: (state, action: PayloadAction<string>) => {
//             return state.filter(task => task.id !== action.payload);
//         },
//         completeTask: (state, action: PayloadAction<string>) => {
//             const index = state.findIndex(task => task.id === action.payload);
//             if (index !== -1) {
//                 state[index].completed = true;
//             }
//         },
//     },
// });

// // Экспортируем действия и редюсер
// export const { addTask, updateTask, deleteTask, completeTask } = taskSlice.actions;
// export default taskSlice.reducer;