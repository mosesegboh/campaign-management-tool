import React from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
    Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../contexts/AuthContext';

const NavButtons: React.FC = () => {
    const { user, logout } = React.useContext(AuthContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    if (user) {
        return isMobile ? (
            <Box>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem component={Link} to="/" onClick={handleClose}>
                        Campaigns
                    </MenuItem>
                    <MenuItem component={Link} to="/new-campaign" onClick={handleClose}>
                        New Campaign
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            logout();
                            handleClose();
                        }}
                    >
                        <LogoutIcon style={{ marginRight: '8px' }} />
                        Logout
                    </MenuItem>
                </Menu>
            </Box>
        ) : (
            <>
                <Button component={Link} to="/" color="inherit">
                    Campaigns
                </Button>
                <Button component={Link} to="/new-campaign" color="inherit">
                    New Campaign
                </Button>
                <Button onClick={logout} color="inherit">
                    <LogoutIcon />
                </Button>
            </>
        );
    }

    return isMobile ? (
        <Box>
            <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/register" onClick={handleClose}>
                    Register
                </MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleClose}>
                    <LoginIcon style={{ marginRight: '8px' }} />
                    Login
                </MenuItem>
            </Menu>
        </Box>
    ) : (
        <>
            <Button component={Link} to="/register" color="inherit">
                Register
            </Button>
            <Button component={Link} to="/login" color="inherit">
                <LoginIcon />
            </Button>
        </>
    );
};

export default NavButtons;
