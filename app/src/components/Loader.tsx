// components/Loader.tsx
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface LoaderProps {
    message?: string; // Optional message prop
}

const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
            <CircularProgress />
            <Typography variant="h6" marginTop={2}>
                {message}
            </Typography>
        </Box>
    );
};

export default Loader;
