import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const SystemInfoPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='80vh'
      textAlign='center'
      px={{ xs: 3, md: 8 }}
      py={6}
    >
      <GraduationCap
        size={80}
        color='#1976d2'
        style={{ marginBottom: '24px' }}
      />

      <Typography
        variant='h3'
        fontWeight='bold'
        color='primary'
        gutterBottom
        sx={{ mb: 3 }}
      >
        Sistema de Inscrição
      </Typography>

      <Box maxWidth='800px' textAlign='justify'>
        <Typography variant='h5' fontWeight='bold' gutterBottom>
          Sobre
        </Typography>

        <Typography variant='body1' color='text.secondary' paragraph>
          O{' '}
          <strong>
            Programa de Pós-Graduação em Tecnologia da Informação (PPGTI)
          </strong>{' '}
          do
          <strong>
            {' '}
            Instituto Federal da Paraíba – Campus João Pessoa
          </strong>{' '}
          oferece o curso de
          <strong> Mestrado Profissional em Tecnologia da Informação</strong>.
        </Typography>

        <Typography variant='body1' color='text.secondary' paragraph>
          O curso de Mestrado do PPGTI teve início em <strong>2019</strong> e
          forma Mestres em Tecnologia da Informação, atuando nas seguintes
          linhas de pesquisa:
        </Typography>

        <Box component='ul' sx={{ textAlign: 'left', pl: 4, mb: 3 }}>
          <Typography component='li' variant='body1' color='text.secondary'>
            Ciência de Dados e Inteligência Artificial
          </Typography>
          <Typography component='li' variant='body1' color='text.secondary'>
            Gestão e Desenvolvimento de Sistemas
          </Typography>
          <Typography component='li' variant='body1' color='text.secondary'>
            Redes e Sistemas Distribuídos
          </Typography>
        </Box>

        <Typography variant='body1' color='text.secondary' paragraph>
          O sistema de inscrição possibilita a{' '}
          <strong>submissão de candidaturas</strong> ao curso de Mestrado, de
          acordo com os <strong>editais de seleção vigentes</strong>.
        </Typography>

        <Typography variant='h5' fontWeight='bold' gutterBottom mt={4}>
          Desenvolvimento do Sistema
        </Typography>

        <Typography variant='body1' color='text.secondary' paragraph>
          Este software foi desenvolvido no âmbito do <strong>PPGTI</strong>{' '}
          como uma versão piloto, com o objetivo de{' '}
          <strong>centralizar e automatizar as inscrições</strong> dos processos
          seletivos do programa. A iniciativa visa otimizar o gerenciamento das
          candidaturas, reduzir erros manuais e oferecer uma experiência mais
          fluida para candidatos e a equipe de coordenação.
        </Typography>

        <Typography variant='body1' color='text.secondary' paragraph>
          A aplicação é resultado de um esforço colaborativo entre discentes e
          docentes do programa, integrando práticas de engenharia de software e
          tecnologias modernas utilizadas no desenvolvimento web.
        </Typography>

        <Typography variant='h5' fontWeight='bold' gutterBottom mt={4}>
          Suporte e Contato
        </Typography>

        <Typography variant='body1' color='text.secondary' paragraph>
          Caso identifique alguma falha, erro ou comportamento inesperado no
          sistema, entre em contato com a equipe de suporte do PPGTI através do
          e-mail:{' '}
          <strong>
            <a href='mailto:coordenacao.ppgti@ifpb.edu.br'>
              coordenacao.ppgti@ifpb.edu.br
            </a>
          </strong>
          .
        </Typography>
      </Box>

      <Stack spacing={2} direction='row' mt={5}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => navigate('/')}
        >
          Voltar para Início
        </Button>
      </Stack>
    </Box>
  );
};

export default SystemInfoPage;
