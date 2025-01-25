import React, { useState, useEffect, ChangeEvent } from 'react';
import api from '../services/api';
import {
    Box,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    SelectChangeEvent,
    Paper,
} from '@mui/material';
import { Campaign } from '../types/types.ts';

function CampaignList() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [searchStatus, setSearchStatus] = useState<string>('');
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const fetchCampaigns = async () => {
        try {
            const response = await api.get<Campaign[]>('/campaigns', {
                params: {
                    title: searchTitle,
                    activity_status: searchStatus,
                },
            });
            setCampaigns(response.data);
        } catch (error) {
            console.error(error);
            showToast('Error fetching campaigns');
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const handleSearch = () => {
        fetchCampaigns();
    };

    const showToast = (message: string) => {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
        setSnackbarMessage('');
    };

    const handleStatusChange = async (id: number, newStatus: 'active' | 'paused') => {
        try {
            await api.patch(`/campaigns/${id}/status`, { activity_status: newStatus });
            showToast(`Campaign ${newStatus === 'active' ? 'activated' : 'paused'}!`);
            fetchCampaigns();
        } catch (error) {
            console.error(error);
            showToast('Error updating status');
        }
    };

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTitle(e.target.value);
    };

    const handleStatusSelectChange = (e: SelectChangeEvent) => {
        setSearchStatus(e.target.value);
    };

    return (
        <Box
            sx={{
                width: '100%',
                p: 2,
            }}
        >
            <Typography variant="h5" mb={2}>
                Campaigns
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 2,
                    mb: 2,
                }}
            >
                <TextField
                    label="Search by Title"
                    value={searchTitle}
                    onChange={handleTitleChange}
                    sx={{ minWidth: 200 }}
                />
                <Select
                    displayEmpty
                    value={searchStatus}
                    onChange={handleStatusSelectChange}
                    sx={{ minWidth: 120 }}
                >
                    <MenuItem value="">All Status</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="paused">Paused</MenuItem>
                </Select>
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </Box>

            {/* Responsive table container */}
            <TableContainer component={Paper} sx={{ width: '98%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Landing Page</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Payouts</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.length > 0 ? (
                            campaigns.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.title}</TableCell>
                                    <TableCell>
                                        <a
                                            href={c.landing_page_url}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            {c.landing_page_url}
                                        </a>
                                    </TableCell>
                                    <TableCell>{c.activity_status}</TableCell>
                                    <TableCell>
                                        {c.payouts.map((payout, idx) => (
                                            <div key={idx}>
                                                {payout.country}: {payout.payout_value}
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        {c.activity_status === 'paused' ? (
                                            <Button
                                                variant="outlined"
                                                color="success"
                                                onClick={() => handleStatusChange(c.id, 'active')}
                                            >
                                                Activate
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                onClick={() => handleStatusChange(c.id, 'paused')}
                                            >
                                                Pause
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (

                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    There is currently no campaigns for you.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={showSnackbar}
                message={snackbarMessage}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            />
        </Box>
    );
}

export default CampaignList;
