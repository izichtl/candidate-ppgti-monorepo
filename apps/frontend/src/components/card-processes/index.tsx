import React from 'react';
import {
  Paper,
  Typography,
  Button,
  Box,
  Link,
  Stack,
  useTheme,
} from '@mui/material';

type SelectionProcess = {
  id: number;
  title: string;
  description?: string;
  program: string;
  start_date: string;
  end_date: string;
  application_deadline?: string;
  result_date?: string;
  contact_info: string;
  year: string;
  semester: string;
  statusColor?: string;
  edital_url?: string;
  onApply?: (id: number) => void;
};

const SelectionProcessCard: React.FC<SelectionProcess> = ({
  id,
  title,
  program,
  start_date,
  end_date,
  year,
  semester,
  contact_info,
  statusColor,
  edital_url,
  onApply,
}) => {
  const theme = useTheme();
  const borderColor = statusColor || theme.palette.success.main;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        border: `2px solid ${borderColor}`,
        borderRadius: 3,
        width: '100%',
        transition: '0.2s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
        {title}
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        {program}
      </Typography>

      <Box display="flex" gap={2} flexWrap="wrap">
        <Typography variant="body2">
          <strong>Data Início:</strong>{' '}
          {new Date(start_date).toLocaleDateString('pt-BR')}
        </Typography>
        <Typography variant="body2">
          <strong>Aberto até:</strong>{' '}
          {new Date(end_date).toLocaleDateString('pt-BR')}
        </Typography>
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Ano/Semestre:</strong> {`${year}.${semester}`}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <strong>Contato:</strong> {contact_info}
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mt: 2, flexWrap: 'wrap' }}>
        {edital_url && (
          <Button
            variant="outlined"
            component={Link}
            href={edital_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver Edital
          </Button>
        )}

        <Button
          variant="contained"
          sx={{
            bgcolor: theme.palette.success.main,
            // fontSize: '1.1rem',
            px: 3,
            '&:hover': {
              bgcolor: theme.palette.success.dark,
            },
          }}
          onClick={() => {
            onApply?.(id);
          }}
        >
          Inscrever
        </Button>
      </Stack>
    </Paper>
  );
};

export default SelectionProcessCard;
