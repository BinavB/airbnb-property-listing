import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/airbnb-custom.css';
import './styles/modern-airbnb-2026.css';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import HomePage from './components/Home/HomePage';
import ExperiencesPage from './components/Experiences/ExperiencesPage';
import ServicesPage from './components/Services/ServicesPage';
import LoginPage from './components/Auth/LoginPage';
import AgentDashboard from './components/Dashboard/AgentDashboard';
import AgentHomePage from './components/Agent/AgentHomePage';
import ProtectedRoute from './components/Common/ProtectedRoute';
import { AuthProvider, useAuth } from './hooks/useAuth';

const API_BASE_URL = 'http://localhost:8000/api';

function AppRoutes() {
    const { token } = useAuth();

    // Redirect logged-in users from home to agent dashboard
    if (token && window.location.pathname === '/') {
        return <Navigate to="/agent-dashboard" />;
    }

    return (
        <Routes>
            <Route path="/" element={token ? <Navigate to="/agent-home" /> : <><HomePage /><Footer /></>} />
            <Route path="/homes" element={token ? <Navigate to="/agent-home" /> : <><HomePage /><Footer /></>} />
            <Route path="/experiences" element={token ? <Navigate to="/agent-home" /> : <><ExperiencesPage /><Footer /></>} />
            <Route path="/services" element={token ? <Navigate to="/agent-home" /> : <><ServicesPage /><Footer /></>} />
            <Route path="/login" element={token ? <Navigate to="/agent-home" /> : <LoginPage />} />
            <Route 
                path="/agent-home" 
                element={
                    token ? (
                        <ProtectedRoute>
                            <AgentHomePage />
                            <Footer />
                        </ProtectedRoute>
                    ) : (
                        <Navigate to="/login" />
                    )
                } 
            />
            <Route 
                path="/agent-dashboard" 
                element={
                    token ? (
                        <ProtectedRoute>
                            <AgentDashboard />
                            <Footer />
                        </ProtectedRoute>
                    ) : (
                        <Navigate to="/login" />
                    )
                } 
            />
            <Route 
                path="/dashboard" 
                element={<Navigate to="/agent-dashboard" />}
            />
        </Routes>
    );
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Navbar />
                    <AppRoutes />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
export { API_BASE_URL };
