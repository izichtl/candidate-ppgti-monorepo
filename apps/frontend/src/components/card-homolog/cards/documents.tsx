import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  FormControlLabel,
  Switch,
  Button,
  Link,
} from '@mui/material';

type Props = {
  borderColor: string;
  checkedStatusGeral: boolean;
  handleToggleStatusGeral: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showMilitaryClearance: boolean;
  documents: {
    diploma_certificate?: string;
    electoral_clearance?: string;
    military_clearance?: string;
    proof_of_residence?: string;
    registration_clearance?: string;
    score_form?: string;
    undergraduate_transcript?: string;
  };
};

const RequiredDocumentsCard: React.FC<Props> = ({
  borderColor,
  checkedStatusGeral,
  handleToggleStatusGeral,
  showMilitaryClearance,
  documents,
}) => {
  const documentLabels: {
    key: keyof typeof documents;
    label: string;
    show?: boolean;
  }[] = [
    {
      key: 'score_form',
      label:
        'Formulário de pontuação preenchido e documentos comprobatórios (Anexo I)',
    },
    {
      key: 'diploma_certificate',
      label:
        'Cópia do diploma ou certificado de conclusão de curso de graduação reconhecido pelo MEC',
    },
    {
      key: 'undergraduate_transcript',
      label: 'Cópia do Histórico Escolar do curso de graduação',
    },
    {
      key: 'registration_clearance',
      label: 'Cópia da carteira de identidade (RG) e CPF',
    },
    {
      key: 'military_clearance',
      label: 'Comprovante de quitação das obrigações militares (se aplicável)',
      show: showMilitaryClearance,
    },
    {
      key: 'electoral_clearance',
      label: 'Comprovante de quitação das obrigações eleitorais',
    },
    {
      key: 'proof_of_residence',
      label: 'Comprovante de residência',
    },
  ];

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
          Upload de Arquivos Obrigatórios
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

      {documentLabels.map(({ key, label, show }) => {
        if (show === false) return null;

        const fileUrl = documents[key];
        if (!fileUrl) return null;

        return (
          <React.Fragment key={key}>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>{label}</strong>
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Link
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                underline="none"
              >
                <Button variant="outlined">Acessar Documento</Button>
              </Link>
            </Box>
          </React.Fragment>
        );
      })}
    </Paper>
  );
};

export default RequiredDocumentsCard;
