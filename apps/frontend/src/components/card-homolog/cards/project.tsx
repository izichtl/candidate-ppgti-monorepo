import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  FormControlLabel,
  Switch,
  Button,
  Stack,
  Link,
} from '@mui/material';

type Props = {
  borderColor: string;
  projectTitle: string;
  projectPath: string;
  researchLine: string;
  researchTopic: string;
  checked: boolean;
  handleToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const PreProjectCard: React.FC<Props> = ({
  borderColor,
  projectTitle,
  projectPath,
  researchLine,
  researchTopic,
  checked,
  handleToggle,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        border: `2px solid ${borderColor}`,
        borderRadius: 3,
        width: '100%',
        mb: 3,
        transition: '0.2s',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={30}>
          Pré-Projeto de Pesquisa do Candidato
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={handleToggle}
              name="statusPreProjeto"
              color="success"
            />
          }
          label={checked ? 'Conforme' : 'Não Conforme'}
          labelPlacement="start"
        />
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Pré-Projeto:</strong> {projectTitle}
      </Typography>

      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Linha de Pesquisa:</strong> {researchLine}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Tema de Pesquisa:</strong> {researchTopic}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Link
          href={projectPath}
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
        >
          <Button variant="outlined">Acessar Documento</Button>
        </Link>
      </Box>
    </Paper>
  );
};

export default PreProjectCard;
