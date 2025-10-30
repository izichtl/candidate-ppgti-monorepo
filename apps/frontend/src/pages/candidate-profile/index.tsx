import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import ScrollToTop from '../../components/scroll-top';
import LoadingBox from '../../components/loading-box';
import FullScreenLoader from '../../components/loading';
import { useGetCandidateFullData } from '../../hooks/get-full-candidate-by-cpf';
import CandidateFullDataCard from '../../components/card-candidate';

const CandidateProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');

  const {
    candidateFullData,
    candidateFullDataLoading,
    candidateFullDataError,
  } = useGetCandidateFullData();

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

      {candidateFullDataLoading && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}

      {!candidateFullDataLoading && candidateFullData && (
        <>
          <Grid container spacing={2} alignItems='center' mb={4}>
            <Grid item xs={12} md={6}>
              <Typography variant='h3' fontWeight='bold'>
                Meu Cadastro
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                variant='h6'
                color='text.secondary'
                textAlign={isMobile ? 'left' : 'right'}
              >
                Última atualização: {currentDateTime}
              </Typography>
            </Grid>
          </Grid>

          <CandidateFullDataCard data={candidateFullData} />
        </>
      )}

      {candidateFullDataError && (
        <Typography color='error' textAlign='center' mt={4}>
          Não foi possível carregar seus dados. Tente novamente mais tarde.
        </Typography>
      )}
    </Box>
  );
};

export default CandidateProfilePage;
