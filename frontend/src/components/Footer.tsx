import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                bottom: 0,
                width: '100%',
                py: 3,
                px: 3,
                textAlign: 'center',
                mt: 20
            }}
        >
            <Typography variant="body1">
                © {new Date().getFullYear()} Ad cash Test
            </Typography>
            <Typography variant="body2" color="text.secondary">
                <Link href="#" color="inherit" underline="hover">
                    Privacy Policy
                </Link>{' '}
                |{' '}
                <Link href="#" color="inherit" underline="hover">
                    Terms of Service
                </Link>
            </Typography>
        </Box>
    );
};


export default Footer;

