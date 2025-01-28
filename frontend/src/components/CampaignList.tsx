import { useState, useEffect, ChangeEvent } from 'react';
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
    Pagination,
    Stack,
    CircularProgress,
} from '@mui/material';
import { Campaign, PaginatedResponse } from '../types/types.ts';

function CampaignList() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [searchTitle, setSearchTitle] = useState<string>('');
    const [searchStatus, setSearchStatus] = useState<string>('');
    const [snackbarMessage, setSnackbarMessage] = useState<string>('');
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(10);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const response = await api.get<PaginatedResponse<Campaign>>('/campaigns', {
                params: {
                    title: searchTitle,
                    activity_status: searchStatus,
                    page: page,
                    per_page: perPage,
                },
            });

            setCampaigns(response.data.data);
            setPage(response.data.current_page);
            setTotalPages(response.data.last_page);
        } catch (error) {
            console.error(error);
            showToast('Error fetching campaigns');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [page, perPage]);

    const handleSearch = () => {
        setPage(1);
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

    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handlePerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
         const value = parseInt(e.target.value, 10)
        if (!isNaN(value)) {
            setPerPage(value);
            setPage(1);
        }

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
                {/* Per Page Selector */}
                <TextField
                    label="Items per page"
                    type="number"
                    value={perPage}
                    onChange={handlePerPageChange}
                    inputProps={{ min: 1, max: 100 }}
                    sx={{ width: 150 }}
                />
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
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : campaigns.length > 0 ? (
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
                                    There are currently no campaigns for you.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination Controls */}
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" mt={2}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Stack>

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
