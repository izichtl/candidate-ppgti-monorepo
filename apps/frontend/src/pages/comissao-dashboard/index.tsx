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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import {
  useGetSelectionProcesses,
  useDeleteSelectionProcess,
} from '../../hooks/selection-processes';
import { useAuth } from '../../hooks/auth';
import SelectionProcessForm from './selection-process-form';
import ErrorSnackbar from '../../components/error-snackbar';
import DeleteConfirmationDialog from '../../components/delete-confirmation-dialog';

interface SelectionProcess {
  id: string;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  application_deadline: string;
  result_date: string;
  documents_required: string[];
  evaluation_criteria: string;
  contact_info: string;
  status: 'draft' | 'published' | 'closed';
  created_at: string;
  updated_at: string;
  program: string;
  year: string;
  semester: string;
}

const ComissaoDashboardPage: React.FC = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [processToDelete, setProcessToDelete] =
    useState<SelectionProcess | null>(null);
  const [processToEdit, setProcessToEdit] = useState<SelectionProcess | null>(
    null,
  );
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });
  const navigate = useNavigate();
  const { getUserFromToken, logout } = useAuth();

  const userInfo = getUserFromToken();

  const { useGetSelectionProcessesFetcher } = useGetSelectionProcesses();

  const { data, error, isLoading, mutate } = useSWR(
    `selection-processes-${refreshKey}`,
    useGetSelectionProcessesFetcher,
    {
      refreshInterval: 30000,
    },
  );

  const selectionProcesses: SelectionProcess[] = data?.data?.data || [];

  const deleteSelectionProcess = useSWRMutation(
    'delete-selection-process',
    async (key: string, { arg }: { arg: string }) => {
      const { useDeleteSelectionProcessFetcher } =
        useDeleteSelectionProcess(arg);
      return await useDeleteSelectionProcessFetcher();
    },
  );

  const handleFormClose = () => {
    setFormOpen(false);
    setProcessToEdit(null);
  };

  const handleFormSuccess = () => {
    setRefreshKey((prev) => prev + 1);
    mutate();

    setSnackbar({
      open: true,
      message: processToEdit
        ? 'Processo seletivo atualizado com sucesso!'
        : 'Processo seletivo criado com sucesso!',
      severity: 'success',
    });

    setProcessToEdit(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/comissao/login');
  };

  const handleDeleteClick = (process: SelectionProcess) => {
    setProcessToDelete(process);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!processToDelete) return;

    try {
      await deleteSelectionProcess.trigger(processToDelete.id);
      setSnackbar({
        open: true,
        message: 'Processo seletivo excluído com sucesso!',
        severity: 'success',
      });
      setRefreshKey((prev) => prev + 1);
      mutate();
    } catch (error: any) {
      console.error('Error deleting selection process:', error);
      setSnackbar({
        open: true,
        message:
          error?.response?.data?.message ||
          'Erro ao excluir processo seletivo. Tente novamente.',
        severity: 'error',
      });
    } finally {
      setDeleteDialogOpen(false);
      setProcessToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProcessToDelete(null);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleEditClick = (process: SelectionProcess) => {
    setProcessToEdit(process);
    setFormOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'default';
      case 'published':
        return 'success';
      case 'closed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return 'Rascunho';
      case 'published':
        return 'Publicado';
      case 'closed':
        return 'Fechado';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle authentication errors from API calls
  useEffect(() => {
    if (error?.response?.status === 401) {
      console.error('Error:', error);
    }
  }, [error]);

  useEffect(() => {
    if (userInfo === null) {
      logout();
      navigate('/');
    }
    if (userInfo !== null) {
      if (userInfo.if_registration === undefined) {
        logout();
        navigate('/');
      }
    }
  }, []);

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Processos Seletivos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setFormOpen(true)}
          size="large"
        >
          Novo Processo Seletivo
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Erro ao carregar processos seletivos. Tente novamente.
          {error.response?.status === 401 && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Sua sessão expirou. Redirecionando para login...
            </Typography>
          )}
        </Alert>
      )}

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      ) : selectionProcesses.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Nenhum processo seletivo encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Crie seu primeiro processo seletivo para começar a gerenciar
            candidatos.
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setFormOpen(true)}
          >
            Criar Processo Seletivo
          </Button>
        </Paper>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {selectionProcesses.map((process) => (
            <Card
              key={process.id}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{ flexGrow: 1, mr: 1 }}
                  >
                    {process.title}
                  </Typography>
                  <Chip
                    label={getStatusLabel(process.status)}
                    color={getStatusColor(process.status) as any}
                    size="small"
                  />
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip
                      label={process.program}
                      variant="outlined"
                      size="small"
                      color="primary"
                    />
                    <Chip
                      label={`${process.year}.${process.semester}`}
                      variant="outlined"
                      size="small"
                      color="secondary"
                    />
                  </Box>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {process.description.length > 100
                    ? `${process.description.substring(0, 100)}...`
                    : process.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                  >
                    <strong>Início:</strong> {formatDate(process.start_date)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                  >
                    <strong>Fim:</strong> {formatDate(process.end_date)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    component="div"
                  >
                    <strong>Prazo de Inscrição:</strong>{' '}
                    {formatDate(process.application_deadline)}
                  </Typography>
                </Box>

                {process.documents_required &&
                  process.documents_required.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        component="div"
                        sx={{ mb: 1 }}
                      >
                        <strong>Documentos Obrigatórios:</strong>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {process.documents_required
                          .slice(0, 3)
                          .map((doc, index) => (
                            <Chip
                              key={index}
                              label={doc}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        {process.documents_required.length > 3 && (
                          <Chip
                            label={`+${process.documents_required.length - 3}`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Box>
                  )}
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<ViewListIcon />}
                  onClick={() => {
                    navigate(`/comissao/processos/${process.id}`);
                  }}
                >
                  Inscrições Realizadas
                </Button>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleEditClick(process)}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteClick(process)}
                  disabled={deleteSelectionProcess.isMutating}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      <SelectionProcessForm
        open={formOpen}
        onClose={handleFormClose}
        onSuccess={handleFormSuccess}
        editingProcess={processToEdit}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="Confirmar Exclusão"
        itemName={processToDelete?.title}
        message={`Tem certeza que deseja excluir o processo seletivo "${processToDelete?.title}"? Este processo será permanentemente removido.`}
        isLoading={deleteSelectionProcess.isMutating}
      />

      <ErrorSnackbar
        open={snackbar.open}
        message={snackbar.message}
        onClose={handleSnackbarClose}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default ComissaoDashboardPage;
