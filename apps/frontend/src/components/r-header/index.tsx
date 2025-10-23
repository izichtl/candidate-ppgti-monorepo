import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Sitemark from '../r-icon/index'; // Mantido
import { Link } from 'react-router-dom';
// Removido import do ColorModeIconDropdown, já que está causando o quadrado vazio.

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  backdropFilter: 'blur(24px)',
  borderBottom: `2px solid ${theme.palette.primary.main}`,
  borderRadius: 0,
  padding: '8px 12px',
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}
          >
            <Link to="/">
              <Sitemark />
            </Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4 }}>
              <Button href="/login" variant="text" color="info" size="small">
                Inscrições
              </Button>
              <Button
                href="/documents"
                variant="text"
                color="info"
                size="small"
              >
                Documentos
              </Button>
              <Button href="/about" variant="text" color="info" size="small">
                Sobre
              </Button>
              {/* <Button href="/blog" variant="text" color="info" size="small">
                Notícias
              </Button> */}
            </Box>
          </Box>

          {/* Ações Desktop */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            <Button
              href="/login"
              color="primary"
              variant="contained"
              size="small"
            >
              Acessar Candidato
            </Button>
            <Button
              href="/comissao/login"
              color="primary"
              variant="outlined"
              size="small"
            >
              Acesso Comissão
            </Button>
            {/* ColorModeIconDropdown removido daqui */}
          </Box>

          {/* Ações Mobile */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            {/* Opcional: Se quiser manter o seletor de tema apenas no mobile, adicione aqui */}
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Drawer Mobile Menu */}
          <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: { top: 'var(--template-frame-height, 0px)' },
            }}
          >
            <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>
              <Link
                to="/login"
                onClick={toggleDrawer(false)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>Inscrições</MenuItem>
              </Link>
              <Link
                to="/documents"
                onClick={toggleDrawer(false)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>Documentos</MenuItem>
              </Link>
              <Link
                to="/about"
                onClick={toggleDrawer(false)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>Sobre</MenuItem>
              </Link>
              {/* <Link
                to='/blog'
                onClick={toggleDrawer(false)}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <MenuItem>Notícias</MenuItem>
              </Link> */}
              <Divider sx={{ my: 3 }} />
              <MenuItem>
                <Button
                  href="/login"
                  color="primary"
                  variant="contained"
                  fullWidth
                >
                  Acesso Candidato
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  href="/comissao/login"
                  color="primary"
                  variant="outlined"
                  fullWidth
                >
                  Acesso Comissão
                </Button>
              </MenuItem>
            </Box>
          </Drawer>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
