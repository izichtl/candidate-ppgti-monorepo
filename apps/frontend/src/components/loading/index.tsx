import { Box, CircularProgress, Typography } from '@mui/material';

const FullScreenLoader = ({ message = 'Carregando...' }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <CircularProgress size={60} color='primary' />
    <Typography variant='h6' color='text.secondary' sx={{ mt: 2 }}>
      {message}
    </Typography>
  </Box>
);

export default FullScreenLoader;
