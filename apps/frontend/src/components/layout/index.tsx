import { Outlet } from 'react-router-dom';
import Header from '../header';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
export default Layout;
