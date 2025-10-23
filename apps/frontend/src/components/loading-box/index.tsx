import { Box } from '@mui/material';

const LoadingBox = ({ children }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      bgcolor: '#f0f4f8',
      zIndex: 1300,
    }}
  >
    {children}
  </Box>
);

export default LoadingBox;
