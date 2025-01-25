import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Button, Typography, Snackbar, Alert, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../components/PasswordField';
import { loginConstraints } from '../validations/loginValidation';
import { validateForm } from '../validations/validateHelper';


const LoginPage: React.FC = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setErrors({});
        setSnackbarMessage('');
        setSnackbarSeverity('error');

        const data = { email, password };
        const validationErrors = validateForm(data, loginConstraints);

        if (Object.keys(validationErrors).length > 0) {
            const formattedErrors: { [key: string]: string } = {};
            for (const key in validationErrors) {
                formattedErrors[key] = validationErrors[key][0];
            }
            setErrors(formattedErrors);
            setIsLoading(false);
            return;
        }

        try {
            await login({ email, password });

            setSnackbarMessage('Login successful! Redirecting to home...');
            setSnackbarSeverity('success');
            setShowSnackbar(true);

            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error: any) {
            if (error?.response?.data) {
                const backendErrors = error.response.data;

                const formattedErrors: { [key: string]: string } = {};

                if (backendErrors.errors) {
                    if (backendErrors.errors.email) {
                        formattedErrors.email = backendErrors.errors.email[0];
                    }
                    if (backendErrors.errors.password) {
                        formattedErrors.password = backendErrors.errors.password[0];
                    }
                }

                setErrors(formattedErrors);

                if (backendErrors.message) {
                    setSnackbarMessage(backendErrors.message);
                    setSnackbarSeverity('error');
                    setShowSnackbar(true);
                }
            } else {
                setSnackbarMessage('An unexpected error occurred. Please try again.');
                setSnackbarSeverity('error');
                setShowSnackbar(true);
            }

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 20, p: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" mb={2} textAlign="center">
                Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="username"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <PasswordField
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}

                    error={!!errors.password}
                    helperText={errors.password}
                />
                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Login'}
                </Button>
            </Box>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={() => setShowSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginPage;
