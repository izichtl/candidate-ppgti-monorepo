import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Alert,
  CircularProgress,
  Paper,
  Link,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  ToggleButton,
  useTheme,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewListIcon from '@mui/icons-material/ViewList';
import DescriptionIcon from '@mui/icons-material/Description';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { useGetProcessApplications } from '../../hooks/get-process-applications';
import { formatDate } from '../../utils/formate-date';

import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getStatusInfo } from '../../utils/status-label';
import LoadingBox from '../../components/loading-box';
import FullScreenLoader from '../../components/loading';
import ScrollToTop from '../../components/scroll-top';

const mockSelectionProcess = {
  id: 4,
  title: 'Titulo',
  program: 'Programa',
  description: 'Descricao',
  year: '2025',
  semester: '1',
  status: 'published',
  start_date: '2025-03-10',
  end_date: '2025-04-30',
  application_deadline: '2025-04-15',
  result_date: '2025-05-10',

  created_at: '2025-06-05T18:05:58.356279',
  updated_at: '2025-06-05T18:05:58.356279',
  applications: [],
};

type Application = {
  applications_verification?: {
    final_status: string;
  }[];
};

export function filterApplicationsByStatus(
  status: 'pending' | 'compliant' | 'rejected' | 'all',
  applications: Application[]
): Application[] {
  if (status === 'all') {
    return applications;
  }

  if (status === 'pending') {
    // Aplica filtering para aplicações que ainda não têm nenhuma verificação
    return applications.filter(
      (app) =>
        !app.applications_verification ||
        app.applications_verification.length === 0
    );
  }

  // Para 'compliant' e 'rejected'
  return applications.filter((app) =>
    app.applications_verification?.some((ver) => ver.final_status === status)
  );
}

const ProcessAplicationList: React.FC = () => {
  const theme = useTheme();
  const [status, setStatus] = useState<string | null>('all');
  const [pageData, setPageData] = useState<any>(mockSelectionProcess);
  const [applicationsArray, setApplicationsArray] = useState<any>([]);
  const navigate = useNavigate();
  // todo, fazer o auth
  // const { getUserFromToken } = useAuth();
  const { id } = useParams();

  const { applications, applicationsLoading, applicationsError } =
    useGetProcessApplications(id);

  useEffect(() => {
    if (applications.id !== undefined) {
      setPageData(applications);
      if (applications.applications[0] !== undefined) {
        const afiltered = filterApplicationsByStatus(
          status as any,
          applications.applications
        );
        setApplicationsArray(afiltered);
      }
    }
  }, [applications, applicationsLoading, applicationsError, status]);

  const handleStatusChange = (event: any, newStatus: string | null) => {
    if (newStatus !== null) {
      setStatus(event.target.value);
    }
  };

  return (
    <>
      {applicationsError && <>ERROR</>}
      {applicationsArray[0] === undefined && <>O processo não tem inscrições</>}
      {applicationsLoading && (
        <LoadingBox>
          <FullScreenLoader />
        </LoadingBox>
      )}
      {applications.id !== undefined && (
        <Box sx={{ padding: 3, width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <ScrollToTop />
            <Typography variant='h4' fontWeight='bold'>
              Inscrições realizadas
            </Typography>
            <Button
              onClick={() => navigate(-1)}
              size='large'
              variant='contained'
              color={'primary'}
              sx={{
                '&:hover': {
                  bgcolor: theme.palette.info.light,
                },
              }}
            >
              Voltar
            </Button>
          </Box>

          <Typography variant='h5' fontWeight={600} sx={{ mb: 1 }}>
            {pageData.title}
          </Typography>

          <Typography variant='h6' color='text.secondary' sx={{ mb: 3 }}>
            {pageData.description.length > 100
              ? `${pageData.description.substring(0, 100)}...`
              : pageData.description}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography variant='body1' color='text.secondary'>
              <strong>Início:</strong> {formatDate(pageData.start_date)} |{' '}
              <strong>Fim:</strong> {formatDate(pageData.end_date)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <ToggleButtonGroup
              value={status}
              exclusive
              onChange={handleStatusChange}
            >
              <ToggleButton color='primary' value='all'>
                Todas
              </ToggleButton>
              <ToggleButton color='warning' value='pending'>
                Aguardando
              </ToggleButton>
              <ToggleButton color='success' value='compliant'>
                Homologado
              </ToggleButton>
              <ToggleButton color='error' value='rejected'>
                Recusado
              </ToggleButton>
            </ToggleButtonGroup>
            {applicationsArray[0] !== undefined &&
              applicationsArray.map((item) => (
                <Card
                  key={item.id}
                  elevation={2}
                  sx={{
                    p: 2.5,
                    border: `2px solid ${
                      item.valid
                        ? theme.palette.text.disabled
                        : theme.palette.text.disabled
                    }`,
                    borderRadius: 3,
                    transition: '0.2s',
                    width: '100%',
                    '&:hover': { boxShadow: 6 },
                  }}
                >
                  <CardContent sx={{ pb: 1 }}>
                    <Typography variant='h6' fontWeight='bold' gutterBottom>
                      {item.candidates.name}
                    </Typography>

                    <Typography
                      variant='subtitle2'
                      color='text.secondary'
                      gutterBottom
                    >
                      {item.candidates.email} · Inscrição:{' '}
                      {new Date(item.application_date).toLocaleDateString()}
                    </Typography>

                    <Divider sx={{ my: 1 }} />

                    <Typography
                      variant='subtitle1'
                      fontWeight='medium'
                      sx={{ mb: 1 }}
                    >
                      Projeto: {item.project_title}
                    </Typography>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 1 }}
                    >
                      <strong>Linha de Pesquisa:</strong>{' '}
                      {item.research_lines.name} <br />
                      <strong>Tema:</strong> {item.research_topics.name} <br />
                      <Link
                        href={item.project_path}
                        target='_blank'
                        rel='noopener noreferrer'
                      ></Link>
                    </Typography>
                    <Link
                      href={item.project_path}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Button
                        variant='contained'
                        color={'primary'}
                        sx={{
                          '&:hover': {
                            bgcolor: theme.palette.info.light,
                          },
                        }}
                        size='small'
                        startIcon={<DescriptionIcon />}
                      >
                        Pre-Projeto
                      </Button>
                    </Link>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                    {item.applications_verification[0] !== undefined && (
                      <Chip
                        label={
                          getStatusInfo(
                            item.applications_verification[0].final_status
                          ).label
                        }
                        color={
                          getStatusInfo(
                            item.applications_verification[0].final_status
                          ).color
                        }
                        size='medium'
                        sx={{ color: 'white' }}
                      />
                    )}
                    {item.applications_verification[0] === undefined && (
                      <Chip
                        label='Aguardando'
                        color='warning'
                        size='medium'
                        sx={{ color: 'white' }}
                      />
                    )}
                    <Button
                      variant='contained'
                      color={'primary'}
                      sx={{
                        '&:hover': {
                          bgcolor: theme.palette.info.light,
                        },
                      }}
                      disabled={
                        item.applications_verification[0] !== undefined &&
                        (getStatusInfo(
                          item.applications_verification[0].final_status
                        ).label === 'Homologado' ||
                          getStatusInfo(
                            item.applications_verification[0].final_status
                          ).label === 'Recusado')
                      }
                      onClick={() =>
                        navigate(
                          `/comissao/processos/${pageData.id}/inscricoes/${item.id}`
                        )
                      }
                    >
                      Homologar Inscrição
                    </Button>
                  </CardActions>
                </Card>
              ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProcessAplicationList;
