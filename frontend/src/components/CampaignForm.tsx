import React, { useState, ChangeEvent, FormEvent, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import api from '../services/api';
import {
    Box,
    TextField,
    Button,
    Typography,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
} from '@mui/material';
import { CreateCampaignPayload, CampaignFormValues } from '../types/types';

const countries = ['Estonia', 'Spain', 'Bulgaria'] as const;


function CampaignForm() {
    const { user } = useContext(AuthContext);

    const [values, setValues] = useState<CampaignFormValues>({
        advertiser_id: user?.advertiser?.id?.toString() || '',
        title: '',
        landing_page_url: '',
        payouts: [{ country: 'Estonia', payout_value: 0 }],
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'success'>('error');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (user?.advertiser?.id) {
            setValues((prev) => ({
                ...prev,
                advertiser_id: user?.advertiser?.id?.toString(),
            }));
        }
    }, [user]);

    const showToast = (message: string, severity: 'error' | 'success' = 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setShowSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
        setSnackbarMessage('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePayoutChange = (
        index: number,
        field: 'country' | 'payout_value',
        value: string | number
    ) => {
        const updatedPayouts = [...values.payouts];
        updatedPayouts[index] = {
            ...updatedPayouts[index],
            [field]: value,
        };
        setValues((prev) => ({
            ...prev,
            payouts: updatedPayouts,
        }));
    };

    const addPayoutRow = () => {
        setValues((prev) => ({
            ...prev,
            payouts: [...prev.payouts, { country: 'Estonia', payout_value: 0 }],
        }));
    };

    const removePayoutRow = (index: number) => {
        const updatedPayouts = [...values.payouts];
        updatedPayouts.splice(index, 1);
        setValues((prev) => ({
            ...prev,
            payouts: updatedPayouts,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        setErrors({});
        setSnackbarMessage('');
        setSnackbarSeverity('error');

        try {
            const payload: CreateCampaignPayload = {
                advertiser_id: Number(values.advertiser_id),
                title: values.title,
                landing_page_url: values.landing_page_url,
                payouts: values.payouts,
            };

            const response = await api.post('/campaigns', payload);

            showToast('Campaign created successfully!', 'success');

            setValues({
                ...values,
                title: '',
                landing_page_url: '',
                payouts: [{ country: 'Estonia', payout_value: 0 }],
            });
        } catch (error: any) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendErrors = error.response.data;

                const formattedErrors: { [key: string]: string } = {};
                if (backendErrors.advertiser_id) {
                    formattedErrors.advertiser_id = backendErrors.advertiser_id[0];
                }
                if (backendErrors.title) {
                    formattedErrors.title = backendErrors.title[0];
                }
                if (backendErrors.landing_page_url) {
                    formattedErrors.landing_page_url = backendErrors.landing_page_url[0];
                }
                if (backendErrors.payouts) {
                    formattedErrors.payouts = backendErrors.payouts[0];
                }

                Object.keys(backendErrors).forEach((key) => {
                    if (key.startsWith('payouts[')) {
                        const match = key.match(/payouts\[(\d+)\]\.(\w+)/);
                        if (match) {
                            const index = match[1];
                            const field = match[2];
                            formattedErrors[`payouts.${index}.${field}`] = backendErrors[key][0];
                        }
                    }
                });

                setErrors(formattedErrors);

                const nonFieldErrors = Object.keys(backendErrors).filter(
                    (key) => !['advertiser_id', 'title', 'landing_page_url', 'payouts'].includes(key)
                );

                if (nonFieldErrors.length > 0) {
                    setSnackbarMessage(backendErrors[nonFieldErrors[0]][0]);
                    setSnackbarSeverity('error');
                    setShowSnackbar(true);
                }
            } else {
                showToast('Error creating campaign', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h5" mb={2}>
                Create New Campaign
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                display="flex"
                flexDirection="column"
                gap={2}
                sx={{
                    maxWidth: '600px',
                    mx: 'auto',
                    width: '100%',
                }}
            >
                <TextField
                    label="Advertiser ID"
                    name="advertiser_id"
                    value={values.advertiser_id}
                    disabled
                    error={!!errors.advertiser_id}
                    helperText={errors.advertiser_id}
                    type="number"
                    InputProps={{ inputProps: { min: 1 } }}
                />
                <TextField
                    label="Campaign Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    error={!!errors.title}
                    helperText={errors.title}
                />
                <TextField
                    label="Landing Page URL"
                    name="landing_page_url"
                    value={values.landing_page_url}
                    onChange={handleChange}
                    error={!!errors.landing_page_url}
                    helperText={errors.landing_page_url}
                />

                {values.payouts.map((payout, index) => (
                    <Box key={index} display="flex" gap={2} alignItems="center">
                        <TextField
                            select
                            label="Country"
                            name={`payouts.${index}.country`}
                            value={payout.country}
                            onChange={(e) => handlePayoutChange(index, 'country', e.target.value)}
                            error={!!errors[`payouts.${index}.country`]}
                            helperText={errors[`payouts.${index}.country`]}
                        >
                            {countries.map((countryOption) => (
                                <MenuItem key={countryOption} value={countryOption}>
                                    {countryOption}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            label="Payout Value"
                            name={`payouts.${index}.payout_value`}
                            type="number"
                            value={payout.payout_value}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                handlePayoutChange(index, 'payout_value', parseFloat(e.target.value) || 0)
                            }
                            error={!!errors[`payouts.${index}.payout_value`]}
                            helperText={errors[`payouts.${index}.payout_value`]}
                            InputProps={{ inputProps: { min: 0 } }}
                        />

                        {values.payouts.length > 1 && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => removePayoutRow(index)}
                            >
                                Remove
                            </Button>
                        )}
                    </Box>
                ))}

                {errors.payouts && (
                    <Typography color="error" variant="body2">
                        {errors.payouts}
                    </Typography>
                )}

                <Button variant="outlined" onClick={addPayoutRow}>
                    Add Another Country Payout
                </Button>

                <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Create Campaign'}
                </Button>
            </Box>

            <Snackbar
                open={showSnackbar}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
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
}

export default CampaignForm;
