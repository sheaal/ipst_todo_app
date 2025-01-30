import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: React.FC = () => {
    // Создаем экземпляр QueryClient
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </Router>
        </QueryClientProvider>
    );
};

export default App;