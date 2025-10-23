import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppAppBar from '../../../components/r-header/index';
import Footer from '../../../components/r-footer/index';
import { Outlet } from 'react-router-dom';

export default function OutLayout(props: { disableCustomTheme?: boolean }) {
  return (
    <>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Container
        maxWidth='lg'
        component='main'
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
