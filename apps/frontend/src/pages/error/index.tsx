import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react'; // Ícone de alerta

const ErrorComponent = () => {
  const navigate = useNavigate();

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      minHeight='80vh'
      textAlign='center'
      px={2}
    >
      <AlertCircle size={80} color='#f44336' style={{ marginBottom: '16px' }} />
      <Typography variant='h3' gutterBottom>
        Oops! Página não encontrada
      </Typography>
      <Typography variant='body1' color='text.secondary' mb={4}>
        Parece que você tentou acessar uma página que não existe ou foi
        removida.
      </Typography>
      <Stack spacing={2} direction='row'>
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

export default ErrorComponent;
