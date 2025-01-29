import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Box, Button, Typography, Snackbar, Alert, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../components/PasswordField';
import { registerConstraints } from '../validations/registerValidation';
import { validateForm } from '../validations/validateHelper';

const RegisterPage: React.FC = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setErrors({});
        setSnackbarMessage('');
        setSnackbarSeverity('error');

        const data = { name, email, password, password_confirmation: passwordConfirmation };
        const validationErrors = validateForm(data, registerConstraints);

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
            await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
            });

            setSnackbarMessage('Registration successful! Redirecting to home...');
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
                    for (const key in backendErrors.errors) {
                        formattedErrors[key] = Array.isArray(backendErrors.errors[key])
                            ? backendErrors.errors[key][0]
                            : backendErrors.errors[key];
                    }
                } else {
                    for (const key in backendErrors) {
                        formattedErrors[key] = Array.isArray(backendErrors[key])
                            ? backendErrors[key][0]
                            : backendErrors[key];
                    }
                }

                setErrors(formattedErrors);

                if (backendErrors.message) {
                    setSnackbarMessage(backendErrors.message);
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
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" mb={2} textAlign="center">
                Register
            </Typography>
            <Box component="form" onSubmit={handleRegister} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <PasswordField
                    label="Confirm Password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    error={!!errors.password_confirmation}
                    helperText={errors.password_confirmation}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={20} /> : null}
                >
                    {isLoading ? 'Registering...' : 'Register'}
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

export default RegisterPage;
