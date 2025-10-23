import {
  Box,
  Container,
  Typography,
  Button,
  // Card,
  // CardContent,
  // Grid,
  // Link,
} from '@mui/material';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '../../hooks/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollToTop from '../../components/scroll-top';

export default function LandingPage() {
  const { isAuthenticated, getUserFromToken } = useAuth();
  const navigate = useNavigate();
  const auth = isAuthenticated();
  const userInfo = getUserFromToken();

  useEffect(() => {
    if (auth) {
      if (userInfo.if_registration === undefined) {
        navigate('/candidate/dashboard');
      } else {
        navigate('/comissao/dashboard');
      }
    }
  }, [auth]);

  return (
    <>
      {/* Sessão Principal */}
      <Box
        sx={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundSize: 'contain',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 4,
        }}
      >
        <ScrollToTop />
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Inscrição no Mestrado Profissional em Tecnologia da Informação
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Faça parte de um dos programas de pós-graduação mais inovadores da
            região. Inscrições abertas!.
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowRight />}
            href="/login"
          >
            Inscreva-se Agora
          </Button>
        </Container>
      </Box>

      {/* Sessão de Notícias */}
      <Container sx={{ my: 8 }}>
        {/* <Typography variant='h4' gutterBottom align='center'>
          Últimas Notícias do PPGTI
        </Typography>
        <Grid container spacing={4}>
          {newsItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Typography variant='h6' gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' paragraph>
                    {item.description}
                  </Typography>
                  <Link href={item.link} target='_blank' underline='hover'>
                    Ler mais
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid> */}
      </Container>
    </>
  );
}

const newsItems = [
  {
    title: 'IFPB abre seleção para Mestrado em TI',
    description:
      'O período de inscrição vai de 16 de outubro a 18 de novembro de 2024.',
    link: 'https://www.ifpb.edu.br/joaopessoa/noticias/2024/10/ifpb-abre-selecao-para-mestrado-profissional-em-tecnologia-da-informacao-1',
  },
  {
    title: 'Live sobre o Processo Seletivo 2025.1',
    description:
      'A transmissão será no dia 24/10, às 19h, no canal do Campus João Pessoa no YouTube.',
    link: 'https://www.ifpb.edu.br/joaopessoa/noticias/2024/10/ppgti-realiza-live-sobre-o-processo-seletivo-2025-1-do-mestrado-profissional-em-tecnologia-da-informacao',
  },
  {
    title: 'Programa de Extensão Universitária da Pós-Graduação',
    description:
      'Submissão de propostas vai de 31 de outubro a 16 de novembro de 2024.',
    link: 'https://www.ifpb.edu.br/joaopessoa/noticias/2024/10/ifpb-seleciona-propostas-para-o-programa-de-extensao-universitaria-da-pos-graduacao',
  },
];
