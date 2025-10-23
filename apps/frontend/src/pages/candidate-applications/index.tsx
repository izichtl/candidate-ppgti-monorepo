import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Stack,
  useMediaQuery,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ScrollToTop from '../../components/scroll-top';
import {
  useGetCandidateAplications,
  UserApplicationsResponseData,
} from '../../hooks/get-candidate-aplications';
import CardApplication from '../../components/card-application';
import LoadingBox from '../../components/loading-box';
import FullScreenLoader from '../../components/loading';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useGetCandidateValidation } from '../../hooks/get-candidate-validation';

const CandidateApplications = () => {
  const theme = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const auth = isAuthenticated();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as 'success' | 'error' | 'warning' | 'info',
  });

  // main state data
  const [applicationsProcesses, setApplicationsProcesses] =
    useState<UserApplicationsResponseData>({
      valid: [],
      outdated: [],
    });

  const { aplications, aplicationsLoading, aplicationsError } =
    useGetCandidateAplications();

  const { cadidateValid, cadidateValidLoading, cadidateValidError } =
    useGetCandidateValidation();

  useEffect(() => {
    if (aplications.valid[0] !== undefined) {
      setApplicationsProcesses(aplications);
    }
  }, [aplications, aplicationsLoading, aplicationsError]);

  useEffect(() => {
    if (cadidateValid !== null) {
      if (!cadidateValid) {
        setSnackbar({
          open: true,
          message: 'Você não completou seu cadastro',
          severity: 'error',
        });
        setTimeout(() => {
          logout();
        }, 1500);
      }
    }
  }, [cadidateValid, cadidateValidLoading, cadidateValidError]);

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth]);

  return (
    <Box
      sx={{
        width: { xs: '100%', md: '80%' },
        minHeight: '100vh',
        mx: 'auto',
        p: { xs: 2, md: 4 },
        pt: 8,
      }}
    >
      <ScrollToTop />
      {aplicationsLoading && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}
      {!aplicationsLoading && (
        <>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" fontWeight="bold">
                Suas inscrições
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h6"
                color="text.secondary"
                textAlign={isMobile ? 'left' : 'right'}
              >
                {currentDateTime}
              </Typography>
            </Grid>
          </Grid>
          {applicationsProcesses.valid[0] !== undefined && (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Inscrições Válidas
              </Typography>
              <Stack spacing={2}></Stack>
              <CardApplication inscricoes={applicationsProcesses.valid} />
            </>
          )}
          {applicationsProcesses.outdated[0] !== undefined && (
            <>
              <br />
              <br />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Inscrições Descartadas
              </Typography>
              <Stack spacing={2}></Stack>
              <CardApplication inscricoes={applicationsProcesses.outdated} />
            </>
          )}
          {applicationsProcesses.valid[0] === undefined && (
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Você não tem inscrições
            </Typography>
          )}
          {snackbar.open && (
            <Box mb={2}>
              <Snackbar
                open={snackbar.open}
                autoHideDuration={1000}
                onClose={() =>
                  setSnackbar((prev) => ({ ...prev, open: false }))
                }
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
              >
                <Alert
                  severity={snackbar.severity}
                  onClose={() =>
                    setSnackbar((prev) => ({ ...prev, open: false }))
                  }
                  sx={{ width: '100%' }}
                >
                  {snackbar.message}
                </Alert>
              </Snackbar>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
export default CandidateApplications;
