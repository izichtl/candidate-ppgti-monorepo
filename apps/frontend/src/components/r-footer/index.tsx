import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/X';
import SitemarkIcon from '../r-icon/index';

function Copyright() {
  return (
    <Typography variant='body2' sx={{ color: 'text.secondary', mt: 1 }}>
      {'Copyright © '}
      <Link color='text.secondary' href='#'>
        Eng. Software - Equipe 01
      </Link>
      &nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <React.Fragment>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <SitemarkIcon />
              <Typography
                variant='body2'
                gutterBottom
                sx={{ fontWeight: 600, mt: 2 }}
              >
                Programa de Pós-Graduação em Tecnologia da Informação
              </Typography>
              <Typography
                variant='body2'
                sx={{ color: 'text.secondary', mb: 2 }}
              >
                Mestrado em ciencia da computação pelo IFPB.
              </Typography>
              <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
                E-mails
              </Typography>
              <Stack spacing={0.5} sx={{ mb: 2 }}>
                <Typography variant='subtitle2' color='text.secondary'>
                  coordenacao.ppgti@ifpb.edu.br
                </Typography>
                <Typography variant='subtitle2' color='text.secondary'>
                  secretaria.cpos.jp@ifpb.edu.br
                </Typography>
                <Typography variant='subtitle2' color='text.secondary'>
                  sac.jp@ifpb.edu.br
                </Typography>
              </Stack>
              <Typography variant='subtitle1' fontWeight='bold' sx={{ mb: 1 }}>
                Telefones Secretaria
              </Typography>
              <Stack spacing={0.5}>
                <Typography variant='subtitle2' color='text.secondary'>
                  (83) 98159-0350
                </Typography>
                <Typography variant='subtitle2' color='text.secondary'>
                  (83) 3612-1394
                </Typography>
              </Stack>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
              Redes Sociais
            </Typography>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.linkedin.com/company/programa-de-p%C3%B3s-gradua%C3%A7%C3%A3o-em-tecnologia-da-informa%C3%A7%C3%A3o/posts/?feedView=all'
            >
              Linkedin
            </Link>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.instagram.com/ppgti_ifpb'
            >
              Instagram
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
              PPGTI
            </Typography>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.ifpb.edu.br/ppgti'
            >
              Institucional
            </Link>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.ifpb.edu.br/ppgti/publicacoes/producao-tecnica'
            >
              Produção Técnica
            </Link>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.ifpb.edu.br/ppgti/publicacoes/dissertacoes'
            >
              Dissertações
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant='body2' sx={{ fontWeight: 'medium' }}>
              IFPB
            </Typography>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.ifpb.edu.br/'
            >
              Institucional
            </Link>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://www.ifpb.edu.br/prpipg'
            >
              Pesquisa e Inovação
            </Link>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='https://repositorio.ifpb.edu.br/handle/177683/986'
            >
              Repositório Digital
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='/about'
            >
              Política de Privacidade
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link
              color='text.secondary'
              variant='body2'
              target='_blank'
              href='/about'
            >
              Termos de Uso e Serviço
            </Link>
            <Copyright />
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}
