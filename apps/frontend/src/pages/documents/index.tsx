import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Link,
  Divider,
} from '@mui/material';

const requerimentos_documentos = [
  {
    title: 'Requerimento-do-discente-ppgti.docx',
    url: 'https://www.ifpb.edu.br/ppgti/documentos/requerimentos-1/requerimento-do-discente-ppgti.docx',
    description: 'Requerimento do discente no modelo do PPGTI',
    publishedAt: '30/01/2025 11h47',
  },
  {
    title: 'Formulário Avaliação Bolsista Mensal.docx',
    url: 'https://www.ifpb.edu.br/ppgti/documentos/requerimentos-1/formulario-avaliacao-bolsista-mensal.docx',
    description: 'Formulário de Avaliação Mensal dos Bolsistas do PPGTI',
    publishedAt: '15/03/2022 19h13',
  },
  {
    title: 'Formulário Avaliação Semestral Bolsista.docx',
    url: 'https://www.ifpb.edu.br/ppgti/documentos/requerimentos-1/formulario-avaliacao-semestral-bolsista.docx',
    description: 'Formulário de Avaliação Semestral dos Bolsistas do PPGTI',
    publishedAt: '15/03/2022 19h13',
  },
  {
    title: 'Formulário Matrícula PPGTI Aluno novo.docx',
    url: 'https://www.ifpb.edu.br/ppgti/documentos/requerimentos-1/formulario-matricula-ppgti-aluno-novo.docx',
    description: 'Formulário para matrícula de alunos novos no PPGTI',
    publishedAt: '01/10/2024 13h30',
  },
  {
    title: 'Formulário para agendamento de bancas PPGTI.docx',
    url: 'https://www.ifpb.edu.br/ppgti/documentos/requerimentos-1/formulario-para-agendamento-de-bancas-ppgti.docx',
    description: 'Formulário para agendamento de bancas no PPGTI',
    publishedAt: '01/10/2024 13h31',
  },
  {
    title: 'IFPB-PPGTI-Template-Pre-ProjetoPesquisa.docx',
    url: 'https://www.ifpb.edu.br/ppgti/documentos/requerimentos-1/ifpb-ppgti-template-pre-projetopesquisa.docx',
    description:
      'Modelo para pré-projeto de pesquisa para Edital de Seleção de Estudantes',
    publishedAt: '09/10/2024 11h22',
  },
];

export default function DocumentsPage() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ textAlign: 'left', fontWeight: 'bold', mb: 1 }}
      >
        Requerimentos e Documentos
      </Typography>
      <Divider sx={{ mb: 2 }} />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Título</strong>
              </TableCell>
              <TableCell>
                <strong>Descrição</strong>
              </TableCell>
              <TableCell>
                <strong>Publicado em</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requerimentos_documentos.map((edital, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Link href={edital.url} target="_blank" rel="noopener">
                    {edital.title}
                  </Link>
                </TableCell>
                <TableCell>{edital.description}</TableCell>
                <TableCell>{edital.publishedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
