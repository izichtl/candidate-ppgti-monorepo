import { useEffect, useState } from 'react';
import { Box, Typography, Grid, useMediaQuery, useTheme } from '@mui/material';
import ScrollToTop from '../../components/scroll-top';

import HomologDataCard from '../../components/card-homolog';
import { useGetApplicationById } from '../../hooks/get-application-by-id';
import { useParams } from 'react-router-dom';
import LoadingBox from '../../components/loading-box';
import FullScreenLoader from '../../components/loading';

const ApplicationsHomolog = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentDateTime = new Date().toLocaleString('pt-BR');

  const [applicationData, setApplicationData] = useState<any>({});
  const { processId, applicationId } = useParams();

  const { aplication, aplicationLoading, aplicationError } =
    useGetApplicationById(applicationId.toString());

  useEffect(() => {
    if (aplication.id !== undefined) {
      setApplicationData(aplication);
    }
  }, [aplication, aplicationLoading, aplicationError]);

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
      {aplicationError === undefined && aplicationLoading && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}
      {applicationData.id !== undefined && (
        <>
          <Grid container spacing={2} alignItems="center" mb={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h3" fontWeight="bold">
                Homologação de Candidato
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
          <HomologDataCard
            data={applicationData}
            statusColor="#4CAF50"
            processId={Number(processId)}
            applicationId={Number(applicationId)}
          />
        </>
      )}
    </Box>
  );
};

export default ApplicationsHomolog;
