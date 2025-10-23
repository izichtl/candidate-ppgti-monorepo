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
} from '@mui/material';

type Props = {
  email: string;
  nome: string;
  cpf: string;
  rg: string;
  endereco: string;
  telFixo: string;
  telCel: string;
  email2: string;
  borderColor: string;
  checkedDadosPessoais: boolean;
  handlePersonalDataChange: (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void;
};

const PersonalDataCard: React.FC<Props> = ({
  email,
  nome,
  cpf,
  rg,
  endereco,
  telFixo,
  telCel,
  email2,
  borderColor,
  checkedDadosPessoais,
  handlePersonalDataChange,
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
          Dados Pessoais
        </Typography>
        <Stack direction="row" spacing={1}>
          <FormControlLabel
            control={
              <Switch
                checked={checkedDadosPessoais}
                onChange={handlePersonalDataChange}
                name="statusSwitch"
                color="success"
                sx={{ ml: 5, transition: 'none' }}
              />
            }
            label={checkedDadosPessoais ? 'Conforme' : 'Não Conforme'}
            labelPlacement="start"
            sx={{ height: '100%', position: 'relative', transition: 'none' }}
          />
        </Stack>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Email:</strong> {email}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Nome:</strong> {nome}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>CPF:</strong> {cpf}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>RG:</strong> {rg}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Cidade:</strong> {endereco}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Tel Fixo:</strong> {telFixo}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Celular:</strong> {telCel}
      </Typography>
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Email Secundário:</strong> {email2}
      </Typography>
    </Paper>
  );
};

export default PersonalDataCard;
