import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  FormControlLabel,
  Switch,
  Link,
} from '@mui/material';

type Props = {
  borderColor: string;
  idCota: number;
  cota: string;
  checkedStatusGeral: boolean;
  handleToggleStatusGeral: (event: React.ChangeEvent<HTMLInputElement>) => void;
  quota_declaration_admission: string;
  quota_declaration_if: string;
};

const quotaMap = {
  1: {
    label: 'Não optante por sistema de cotas',
    showAdmission: false,
    showIfDeclaration: false,
  },
  2: {
    label: 'Autodeclarado preto, pardo ou indígena',
    showAdmission: true,
    showIfDeclaration: false,
  },
  3: {
    label: 'Pessoa com deficiência',
    showAdmission: true,
    showIfDeclaration: false,
  },
  4: {
    label: 'Servidor do Instituto Federal',
    showAdmission: false,
    showIfDeclaration: true,
  },
};

const QuotaInfoCard: React.FC<Props> = ({
  borderColor,
  idCota,
  cota,
  checkedStatusGeral,
  handleToggleStatusGeral,
  quota_declaration_admission,
  quota_declaration_if,
}) => {
  const quotaConfig = quotaMap[idCota] || {
    label: 'Cota não identificada',
    showAdmission: false,
    showIfDeclaration: false,
  };

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
          Cota e Comprovantes
        </Typography>

        <FormControlLabel
          control={
            <Switch
              checked={checkedStatusGeral}
              onChange={handleToggleStatusGeral}
              name="statusGeral"
              color="success"
            />
          }
          label={checkedStatusGeral ? 'Conforme' : 'Não Conforme'}
          labelPlacement="start"
        />
      </Box>

      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1" sx={{ mb: 1 }}>
        <strong>Cota:</strong> {quotaConfig.label}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Sempre renderiza se houver quota_declaration_admission */}
      {quota_declaration_admission && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Declaração de optante por cota de ingresso.</strong>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Link
              href={quota_declaration_admission}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Button variant="outlined">Acessar Documento</Button>
            </Link>
          </Box>
        </>
      )}

      {/* Só renderiza se houver quota_declaration_if */}
      {quota_declaration_if && (
        <>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Declaração de cota – {quotaConfig.label}. </strong>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Link
              href={quota_declaration_if}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
            >
              <Button variant="outlined">Acessar Documento</Button>
            </Link>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default QuotaInfoCard;
