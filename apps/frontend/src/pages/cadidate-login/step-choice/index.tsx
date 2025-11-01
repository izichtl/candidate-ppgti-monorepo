import React from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ScrollToTop from '../../../components/scroll-top';

type Props = {
  onEdit: () => void;
  onSkip: () => void;
  disabled: boolean;
};

const StepAccessChoice: React.FC<Props> = ({ onEdit, onSkip, disabled }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', p: 2, pt: 8 }}>
      <Paper
        elevation={isMobile ? 0 : 3}
        sx={{
          maxWidth: 600,
          mx: 'auto',
          p: 4,
          borderRadius: isMobile ? 0 : 2,
          bgcolor: '#fff',
        }}
      >
        <ScrollToTop />
        <Typography variant='h5' align='center' gutterBottom>
          Você deseja atualizar seus dados?
        </Typography>
        <Typography
          variant='body2'
          align='center'
          color='text.secondary'
          gutterBottom
        >
          Já carregamos suas informações cadastradas anteriormente. Escolha uma
          opção para continuar.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mt: 4,
          }}
        >
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={onEdit}
          >
            Sim, quero revisar meus dados
          </Button>
          <Button
            disabled={!disabled}
            variant='outlined'
            color='primary'
            fullWidth
            onClick={onSkip}
          >
            Não, continuar sem editar
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default StepAccessChoice;
