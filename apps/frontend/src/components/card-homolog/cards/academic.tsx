import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  FormControlLabel,
  Switch,
  Link,
} from '@mui/material';

type Props = {
  graduacao: string;
  anoGraduacao: string;
  instituicaoGraduacao: string;
  cursoEspecializacao: string;
  anoEspecializacao: string;
  instituicaoEspecializacao: string;
  linkLattes: string;
  borderColor: string;
  checkedDadosAcademicos: boolean;
  handleAcademicDataChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const AcademicDataCard: React.FC<Props> = ({
  graduacao,
  anoGraduacao,
  instituicaoGraduacao,
  cursoEspecializacao,
  anoEspecializacao,
  instituicaoEspecializacao,
  linkLattes,
  borderColor,
  checkedDadosAcademicos,
  handleAcademicDataChange,
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
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }} fontSize={25}>
          Dados Acadêmicos
        </Typography>
        <Stack direction="row" spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={checkedDadosAcademicos}
                onChange={handleAcademicDataChange}
                name="statusSwitch"
                color="success"
                sx={{ ml: 6 }}
              />
            }
            label={checkedDadosAcademicos ? 'Conforme' : 'Não Conforme'}
            labelPlacement="start"
            sx={{ height: '100%' }}
          />
        </Stack>
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Graduação:</strong> {graduacao}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Ano de Graduação:</strong> {anoGraduacao}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Instituição de Graduação:</strong> {instituicaoGraduacao}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Curso de Especialização:</strong> {cursoEspecializacao}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Ano de Especialização:</strong> {anoEspecializacao}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Instituição de Especialização:</strong>{' '}
        {instituicaoEspecializacao}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Link Lattes:</strong>{' '}
        <Link href={linkLattes} target="_blank" rel="noopener noreferrer">
          Acesse o Currículo Lattes
        </Link>
      </Typography>
    </Paper>
  );
};

export default AcademicDataCard;
