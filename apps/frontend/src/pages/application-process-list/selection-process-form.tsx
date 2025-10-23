import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Stack,
} from '@mui/material';
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';
import { AxiosError } from 'axios';
import useSWRMutation, { SWRMutationResponse } from 'swr/mutation';
import {
  useCreateSelectionProcess,
  SelectionProcessProps,
} from '../../hooks/selection-processes';
import { getErrorMessage } from '../../utils/error-messages';

interface SelectionProcessFormProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DOCUMENT_OPTIONS = [
  'Currículo Lattes',
  'Diploma de Graduação',
  'Histórico Escolar',
  'Carta de Motivação',
  'Projeto de Pesquisa',
  'Certificados de Cursos',
  'Comprovante de Proficiência em Idiomas',
  'Carteira de Identidade',
  'CPF',
  'Comprovante de Residência',
];

const PROGRAM_OPTIONS = [
  'Mestrado Acadêmico',
  'Mestrado Profissional',
  'Doutorado',
];

const YEAR_OPTIONS = ['2024', '2025', '2026', '2027'];

const SEMESTER_OPTIONS = ['1', '2'];

const SelectionProcessForm: React.FC<SelectionProcessFormProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Título é obrigatório')
      .min(5, 'Título deve ter pelo menos 5 caracteres'),
    description: Yup.string()
      .required('Descrição é obrigatória')
      .min(20, 'Descrição deve ter pelo menos 20 caracteres'),
    program: Yup.string().required('Programa é obrigatório'),
    year: Yup.string().required('Ano é obrigatório'),
    semester: Yup.string().required('Semestre é obrigatório'),
    start_date: Yup.string().required('Data de início é obrigatória'),
    end_date: Yup.string().required('Data de fim é obrigatória'),
    application_deadline: Yup.string().required(
      'Prazo de inscrição é obrigatório',
    ),
    result_date: Yup.string().required('Data de resultado é obrigatória'),
    documents_required: Yup.array().min(
      1,
      'Pelo menos um documento deve ser selecionado',
    ),
    evaluation_criteria: Yup.string()
      .required('Critérios de avaliação são obrigatórios')
      .min(10, 'Critérios devem ter pelo menos 10 caracteres'),
    contact_info: Yup.string()
      .required('Informações de contato são obrigatórias')
      .email('Digite um email válido'),
    status: Yup.string()
      .oneOf(['draft', 'published'], 'Status inválido')
      .required('Status é obrigatório'),
  });

  const initialValues: SelectionProcessProps = {
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    application_deadline: '',
    result_date: '',
    documents_required: [],
    evaluation_criteria: '',
    contact_info: '',
    status: 'draft',
    program: '',
    year: new Date().getFullYear().toString(),
    semester: new Date().getMonth() < 6 ? '1' : '2',
  };

  const formik: FormikProps<SelectionProcessProps> =
    useFormik<SelectionProcessProps>({
      initialValues,
      validationSchema,
      enableReinitialize: true,
      validateOnBlur: false,
      validateOnMount: false,
      onSubmit: async (values: SelectionProcessProps) => {
        await handleSubmit(values);
      },
    });

  const { useCreateSelectionProcessFetcher } = useCreateSelectionProcess(
    formik.values,
  );

  const {
    trigger: triggerCreate,
    isMutating: isCreating,
  }: SWRMutationResponse<any> = useSWRMutation(
    'useCreateSelectionProcessFetcher',
    useCreateSelectionProcessFetcher,
    {
      revalidate: false,
    },
  );

  const handleSubmit = async (values: SelectionProcessProps) => {
    try {
      setErrorMessage(null);
      setSuccessMessage(null);

      await triggerCreate();
      setSuccessMessage('Processo seletivo criado com sucesso!');
      setTimeout(() => {
        onSuccess();
        onClose();
        formik.resetForm();
      }, 2000);
    } catch (error: AxiosError | any) {
      const errorMsg = getErrorMessage(error);
      setErrorMessage(errorMsg);
    }
  };

  const handleClose = () => {
    formik.resetForm();
    setErrorMessage(null);
    setSuccessMessage(null);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h5">Cadastrar Processo Seletivo</Typography>
      </DialogTitle>

      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 2 }}>
          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
              label="Título do Processo Seletivo"
              name="title"
              fullWidth
              value={formik.values.title}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.title && formik.touched.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField
              label="Descrição"
              name="description"
              fullWidth
              multiline
              rows={4}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={Boolean(
                formik.errors.description && formik.touched.description,
              )}
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Programa</InputLabel>
                <Select
                  name="program"
                  value={formik.values.program}
                  onChange={formik.handleChange}
                  label="Programa"
                  error={Boolean(
                    formik.errors.program && formik.touched.program,
                  )}
                >
                  {PROGRAM_OPTIONS.map((program) => (
                    <MenuItem key={program} value={program}>
                      {program}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.program && formik.errors.program && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {formik.errors.program}
                  </Typography>
                )}
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Ano</InputLabel>
                <Select
                  name="year"
                  value={formik.values.year}
                  onChange={formik.handleChange}
                  label="Ano"
                  error={Boolean(formik.errors.year && formik.touched.year)}
                >
                  {YEAR_OPTIONS.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.year && formik.errors.year && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {formik.errors.year}
                  </Typography>
                )}
              </FormControl>

              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Semestre</InputLabel>
                <Select
                  name="semester"
                  value={formik.values.semester}
                  onChange={formik.handleChange}
                  label="Semestre"
                  error={Boolean(
                    formik.errors.semester && formik.touched.semester,
                  )}
                >
                  {SEMESTER_OPTIONS.map((semester) => (
                    <MenuItem key={semester} value={semester}>
                      {semester}º Semestre
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.semester && formik.errors.semester && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {formik.errors.semester}
                  </Typography>
                )}
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Data de Início"
                name="start_date"
                type="datetime-local"
                sx={{ flex: 1 }}
                value={formik.values.start_date}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.start_date && formik.touched.start_date,
                )}
                helperText={
                  formik.touched.start_date && formik.errors.start_date
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Data de Término"
                name="end_date"
                type="datetime-local"
                sx={{ flex: 1 }}
                value={formik.values.end_date}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.end_date && formik.touched.end_date,
                )}
                helperText={formik.touched.end_date && formik.errors.end_date}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Prazo de Inscrição"
                name="application_deadline"
                type="datetime-local"
                sx={{ flex: 1 }}
                value={formik.values.application_deadline}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.application_deadline &&
                    formik.touched.application_deadline,
                )}
                helperText={
                  formik.touched.application_deadline &&
                  formik.errors.application_deadline
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                label="Data do Resultado"
                name="result_date"
                type="datetime-local"
                sx={{ flex: 1 }}
                value={formik.values.result_date}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.result_date && formik.touched.result_date,
                )}
                helperText={
                  formik.touched.result_date && formik.errors.result_date
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>

            <FormControl fullWidth>
              <InputLabel>Documentos Obrigatórios</InputLabel>
              <Select
                multiple
                value={formik.values.documents_required}
                onChange={(event) => {
                  formik.setFieldValue(
                    'documents_required',
                    event.target.value,
                  );
                }}
                input={<OutlinedInput label="Documentos Obrigatórios" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                error={Boolean(
                  formik.errors.documents_required &&
                    formik.touched.documents_required,
                )}
              >
                {DOCUMENT_OPTIONS.map((doc) => (
                  <MenuItem key={doc} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.documents_required &&
                formik.errors.documents_required && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {formik.errors.documents_required}
                  </Typography>
                )}
            </FormControl>

            <TextField
              label="Critérios de Avaliação"
              name="evaluation_criteria"
              fullWidth
              multiline
              rows={3}
              value={formik.values.evaluation_criteria}
              onChange={formik.handleChange}
              error={Boolean(
                formik.errors.evaluation_criteria &&
                  formik.touched.evaluation_criteria,
              )}
              helperText={
                formik.touched.evaluation_criteria &&
                formik.errors.evaluation_criteria
              }
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Email de Contato"
                name="contact_info"
                type="email"
                sx={{ flex: 2 }}
                value={formik.values.contact_info}
                onChange={formik.handleChange}
                error={Boolean(
                  formik.errors.contact_info && formik.touched.contact_info,
                )}
                helperText={
                  formik.touched.contact_info && formik.errors.contact_info
                }
              />

              <FormControl sx={{ flex: 1 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  label="Status"
                  error={Boolean(formik.errors.status && formik.touched.status)}
                >
                  <MenuItem value="draft">Rascunho</MenuItem>
                  <MenuItem value="published">Publicado</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <Typography variant="caption" color="error" sx={{ ml: 2 }}>
                    {formik.errors.status}
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button
          onClick={formik.submitForm}
          variant="contained"
          color="primary"
          disabled={isCreating}
        >
          {isCreating ? 'Criando...' : 'Criar Processo Seletivo'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectionProcessForm;
