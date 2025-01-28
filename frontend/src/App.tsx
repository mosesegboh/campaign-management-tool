import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import CampaignList from './components/CampaignList';
import CampaignForm from './components/CampaignForm';
import PrivateRoute from './components/PrivateRoute';
import Footer from './components/Footer';
import NavButtons from './components/NavButtons';
import './App.css';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Campaign Management
                        </Typography>
                        <NavButtons />
                    </Toolbar>
                </AppBar>

                <Box sx={{ mt: 4 }}>
                    <Routes>
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute>
                                    <CampaignList />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/new-campaign"
                            element={
                                <PrivateRoute>
                                    <CampaignForm />
                                </PrivateRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                    <Footer />
                </Box>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;


