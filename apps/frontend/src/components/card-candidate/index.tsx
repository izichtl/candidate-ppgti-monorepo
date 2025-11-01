import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Button,
  Link,
  useTheme,
} from '@mui/material';
import { CandidateFullDataResponse } from '../../hooks/get-full-candidate-by-cpf';
import CustomLink from '../custom-link';

type Props = {
  data: CandidateFullDataResponse;
};

const CandidateFullDataCard: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  const borderColor = theme.palette.text.disabled;
  const { candidate, documents } = data;

  const documentLabels: { key: keyof typeof documents; label: string }[] = [
    { key: 'score_form', label: 'Formulário de Pontuação' },
    {
      key: 'diploma_certificate',
      label: 'Diploma ou Certificado de Conclusão',
    },
    { key: 'undergraduate_transcript', label: 'Histórico de Graduação' },
    { key: 'electoral_clearance', label: 'Comprovante de Quitação Eleitoral' },
    { key: 'proof_of_residence', label: 'Comprovante de Residência' },
    { key: 'military_clearance', label: 'Quitação Militar (se aplicável)' },
    {
      key: 'quota_declaration_admission',
      label: 'Declaração de Cota (Ingresso)',
    },
    { key: 'quota_declaration_if', label: 'Declaração de Cota (IF)' },
    { key: 'registration_clearance', label: 'Comprovante de Matrícula' },
    { key: 'employment_link', label: 'Comprovante de Vínculo Empregatício' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }} fontSize={25}>
          Dados Pessoais
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Nome completo:</strong> {candidate.name}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>CPF:</strong> {candidate.cpf}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>E-mail principal:</strong> {candidate.email}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Outro e-mail:</strong> {candidate.other_email || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Telefone celular:</strong> {candidate.cell_phone || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Telefone fixo:</strong> {candidate.phone || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Endereço:</strong>{' '}
          {`${candidate.address || ''}, ${candidate.address_number || ''} ${
            candidate.address_complement || ''
          }`}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Bairro:</strong> {candidate.address_neighborhood || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Cidade:</strong> {candidate.address_city || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Estado:</strong> {candidate.address_state || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>CEP:</strong> {candidate.address_zipcode || '-'}
        </Typography>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }} fontSize={25}>
          Formação Acadêmica
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Curso de Graduação:</strong>{' '}
          {candidate.graduation_course || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Ano de Conclusão:</strong> {candidate.graduation_year || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Instituição:</strong>{' '}
          {candidate.graduation_institution || '-'}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Curso de Especialização:</strong>{' '}
          {candidate.specialization_course || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Ano de Conclusão:</strong>{' '}
          {candidate.specialization_year || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Instituição:</strong>{' '}
          {candidate.specialization_institution || '-'}
        </Typography>
        <Typography variant='body1' sx={{ mb: 1 }}>
          <strong>Currículo Lattes:</strong>
          {' -  '}
          {candidate.lattes_link ? (
            <Link
              href={candidate.lattes_link}
              target='_blank'
              rel='noopener noreferrer'
              underline='none'
            >
              <Button
                color={'primary'}
                variant='contained'
                sx={{
                  '&:hover': {
                    bgcolor: theme.palette.info.light,
                  },
                }}
              >
                Currículo Lattes
              </Button>
            </Link>
          ) : (
            '-'
          )}
        </Typography>
      </Paper>

      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          border: `2px solid ${borderColor}`,
          borderRadius: 3,
          mb: 3,
          transition: '0.2s',
          '&:hover': { boxShadow: 6 },
        }}
      >
        <Typography variant='h6' fontWeight='bold' sx={{ mb: 2 }} fontSize={25}>
          Documentos Enviados
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {documentLabels.map(({ key, label }) => {
          const fileUrl = documents[key];
          if (!fileUrl) return null;

          return (
            <Box key={key} sx={{ mb: 3 }}>
              <Typography variant='body1' sx={{ mb: 1 }}>
                <strong>{label}</strong>
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CustomLink
                  to={fileUrl as string}
                  target='_blank'
                  rel='noopener noreferrer'
                  underline='none'
                >
                  <Button
                    color={'primary'}
                    variant='contained'
                    sx={{
                      '&:hover': {
                        bgcolor: theme.palette.info.light,
                      },
                    }}
                  >
                    Acessar Documento
                  </Button>
                </CustomLink>
              </Box>
              <Divider sx={{ mb: 1 }} />
            </Box>
          );
        })}

        {Object.values(documents).filter(Boolean).length === 0 && (
          <Typography color='text.secondary'>
            Nenhum documento enviado.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default CandidateFullDataCard;
